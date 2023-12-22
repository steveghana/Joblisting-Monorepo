import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseFilters,
  Next,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
// import validationUtil from '../../../util/validation';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../services/user.service';
import { HttpExceptionFilter } from '../../../middleware/err.Middleware';
import { Response } from 'express';
import { IUser } from '../../../types/user';
// interface IUser {
//   role?: IProfession | null;
//   email: string;
//   password: string;
//   rememberMe: boolean;
// }
@Controller('/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('registerBusiness')
  @Post('/register')
  @UseFilters(new HttpExceptionFilter())
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorised user',
        error: 'Unauthorized',
      },
    },
  })
  @ApiOperation({
    description: 'Registering new business',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async register(@Body() req: any, @Res() res: Response) {
    const result = await this.authService.register(
      req.user.email,
      req.user.password,
      req.user.firstName,
      req.user.lastName,
      req.user.role,
      req.user.country,
    );
    console.log(result);
    res.status(200).json(result);
  }
  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  // @UseFilters(new HttpExceptionFilter())
  @ApiTags('login')
  @ApiOperation({
    description: 'loggin new business',
  })
  // @UsePipes(ValidationPipe)
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async login(@Body() req: IUser & { rememberMe: boolean }, @Res() res) {
    const result = await this.authService.login(
      req.email,
      req.password,
      req.role,
      req.rememberMe,
    );

    return res.json(result);
  }
  @Post('/login/credentialToken')
  @ApiTags('login')
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({
    description: 'loggin new business',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async loginWithCredentials(@Body() req: any, @Res() res) {
    const result = await this.authService.loginWithCredentialToken(
      req.credentialTokenUuid,
    );
    return res.json(result);
  }

  @Post('/logout')
  @ApiTags('logout')
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({
    description: 'logout  business',
  })
  // @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async logout(@Next() next, @Req() req: any, @Res() res) {
    const result = await this.authService.logout(
      req.requestingAuthToken.id,
      req.credentialToken,
    );
    return res.status(200).send(result);
  }
  @Post('/login/google')
  @UseFilters(new HttpExceptionFilter())
  async googleAuthLogin(
    @Body() user: Record<any, any>,
    @Request() req,
    @Res() res,
  ) {
    const { user: userinfo } = user;
    const result = await this.authService.googleLogin(userinfo);
    return res.status(200).send(result);
  }
  @Post('/register/google')
  @UseFilters(new HttpExceptionFilter())
  async googleAuthRegister(
    @Body() user: Record<any, any>,
    @Request() req,
    @Res() res,
  ) {
    const { user: userinfo } = user;
    const result = await this.authService.googleRegister(userinfo);
    return res.status(200).send(result);
  }
  @Get('')
  @UseFilters(new HttpExceptionFilter())
  async getRoles(@Request() req, @Res() res) {
    const result = await this.authService.getUsersRoles();
    return res.status(200).send(result);
  }
  @Patch('/update')
  @UseFilters(new HttpExceptionFilter())
  async update(@Req() req, @Res() res: Response) {
    const result = await this.authService.update(req.requestingUser, req.role);
    console.log(result, 'tis is theresu');
    return res.json(result);
  }
  @Get('/whoami')
  @UseFilters(new HttpExceptionFilter())
  async whoami(@Req() req: Request, @Res() res: Response, @Next() next) {
    const user: Omit<IUser, 'password'> = await (req as any).requestingUser;
    console.log(user, 'tis is the user');
    if (!user) {
      throw new HttpException('User doesnt exist', HttpStatus.BAD_REQUEST);
    }
    return res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
    });
  }
  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  async getUser(@Param('id') id: string, @Res() res: Response, @Next() next) {
    const user: IUser = await this.authService.getUserById(id);
    if (!user) {
      throw new HttpException('User doesnt exist', HttpStatus.BAD_REQUEST);
    }
    return res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
    });
  }
}
