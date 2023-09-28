import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Inject,
  // CACHE_MANAGER,
  Next,
} from '@nestjs/common';
import { EmailTemplate } from './emailtemplate';
import { useTransaction } from '../../../Config/transaction';
import cryptoUtil from '../../../util/crypto';
import User from './userEntity';
import CredentialToken from './Credentials/DataManager/credentialToken';
import AuthToken from './Token/DataManager/authToken';
import { JwtService } from '@nestjs/jwt';
import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';

import { UserEntity } from '../models/user.entity';
import { IUser } from '../models/user';
import { GoogleLoginUserDto } from '../controllers/user.dto';
// import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(private jwtService: JwtService) {}
  async googleLogin(user: GoogleLoginUserDto) {
    //   if (!user) {
    //     throw new UnauthorizedException('No user from google');
    //   }
    //   const {
    //     firstName,
    //     lastName,
    //     email,
    //     email_verified,
    //     expires_in,
    //     picture,
    //     providerAccountId,
    //     accessToken,
    //     refreshToken,
    //     id_token,
    //   } = user;
    //   const userData = await this.prisma.users.findFirst({
    //     where: { email },
    //     include: { accounts: true },
    //   });
    //   if (!userData) {
    //     const newUserData = await this.prisma.users.create({
    //       data: {
    //         name: `${firstName} ${lastName}`,
    //         email: email,
    //         emailVerified: email_verified ? new Date().toISOString() : null,
    //         image: picture,
    //         accounts: {
    //           create: {
    //             type: 'oauth',
    //             provider: 'google',
    //             providerAccountId: providerAccountId,
    //             access_token: accessToken,
    //             refresh_token: refreshToken,
    //             id_token: id_token,
    //             expires_at: expires_in,
    //           },
    //         },
    //       },
    //     });
    //     const access_token = await this.signJwt(
    //       newUserData.id,
    //       id_token,
    //       accessToken,
    //       expires_in,
    //     );
    //     return { access_token };
    //   }
    //   const access_token = await this.signJwt(
    //     userData.id,
    //     id_token,
    //     accessToken,
    //     expires_in,
    //   );
    //   return { access_token };
    // }
    // signJwt(
    //   userId: string,
    //   id_token: string,
    //   access_token: string,
    //   expires_at: number,
    //   expiresIn = '1d',
    // ): Promise<string> {
    //   const payload = {
    //     sub: userId,
    //     id_token,
    //     access_token,
    //     expires_at,
    //   };
    //   return this.jwtService.signAsync(payload, {
    //     expiresIn,
    //     secret: this.configService.get('APP_JWT_SECRET'),
    //   });
    return null;
  }
  public async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db', 'config', 'email']);
    const passwordHash = await cryptoUtil.hash(
      password,
      dependencies.config!.authentication!.passwordHashIterations,
    );

    // throw new HttpException('exists', HttpStatus.BAD_REQUEST);
    return useTransaction(async (transaction) => {
      const [user, UserMethods] = await User.findElseCreate(
        {
          email,
          role,
          firstName,
          lastName,
        },
        passwordHash,
        transaction,
        dependencies,
      );
      if (!(await UserMethods.passwordMatches(''))) {
        console.log('throwing new exceptions ...........');

        throw new HttpException('exists', HttpStatus.BAD_REQUEST);
      }

      await UserMethods.update(
        {
          password: passwordHash,
        },
        transaction,
      );
      const payload = {
        email: user.email,
        role: user.role,
        firstName,
        lastName,
      };
      return {
        ...payload,
        token: this.jwtService.sign(payload),
      };
    });
  }

  public async login(
    email: string,
    password: string,
    rememberMe = false,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db', 'config']);
    const user = new User(email, dependencies);
    const exists = await user.exists();
    console.log('login started', exists);
    const fakePassword = await cryptoUtil.hash(
      '',
      dependencies.config.authentication.passwordHashIterations,
    );
    const passwordMatches = await (exists
      ? user.passwordMatches(password)
      : cryptoUtil.compare('', fakePassword));

    const passwordIsEmpty = await (exists
      ? user.passwordMatches('')
      : cryptoUtil.compare('', fakePassword));
    if (exists && passwordIsEmpty) {
      throw new HttpException('passwordless user', HttpStatus.BAD_REQUEST);
    }

    if (!exists || (exists && !passwordMatches)) {
      throw new HttpException('generic', HttpStatus.BAD_REQUEST);
    }

    if (await user.isLocked()) {
      throw new HttpException(await user.role, HttpStatus.BAD_REQUEST);
    }
    const [authToken, credentialToken] = await useTransaction(
      async (transaction) => {
        const c = rememberMe
          ? await CredentialToken.createForUser(
              email,
              transaction,
              dependencies,
            )
          : null;
        const a = await AuthToken.createForUser(
          email,
          c && c.id,
          transaction,
          dependencies,
        );
        return [a, c];
      },
      dependencies,
    );
    const payload = { email: user.email, role: user.role };

    return {
      ...payload,
      // token: this.jwtService.sign(payload),
      authTokenId: authToken.id,
      credentialTokenUuid: credentialToken && credentialToken.uuid,
    };
  }

  async loginWithCredentialToken(
    credentialTokenUuid: string,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db']);

    const credentialToken = await CredentialToken.getByUuid(
      credentialTokenUuid,
      dependencies,
    );
    if (!credentialToken.exists || credentialToken.isInactive()) {
      throw new HttpException('generic', HttpStatus.BAD_REQUEST);
    }

    const user = new User(credentialToken.userEmail, dependencies);
    if (!(await user.exists())) {
      throw new HttpException('generic', HttpStatus.BAD_REQUEST);
    }

    if (await user.passwordMatches('')) {
      throw new HttpException('passwordless user', HttpStatus.BAD_REQUEST);
    }

    const [newCredentialTokenUuid, authToken] = await useTransaction(
      async (transaction) => {
        const [c] = await Promise.all([
          credentialToken.renewUuid(transaction),
          AuthToken.expireOfCredentialToken(
            credentialToken.id,
            transaction,
            dependencies,
          ),
        ]);
        const a = await AuthToken.createForUser(
          credentialToken.userEmail,
          credentialToken.id,
          transaction,
          dependencies,
        );
        return [c, a];
      },
      dependencies,
    );

    return {
      authTokenId: authToken.id,
      credentialTokenUuid: newCredentialTokenUuid,
    };
  }
  async logout(
    authTokenId: string,
    credentialTokenUuid: string,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db']);

    const authToken = new AuthToken(authTokenId, dependencies);
    await Promise.all([
      authToken.deactivate(),
      CredentialToken.deactivateByUuid(credentialTokenUuid, dependencies),
    ]);
    // return new LogoutSuccess();
  }
}
