import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  NestMiddleware,
  UsePipes,
  UseFilters,
  ValidationPipe,
  Next,
  UseGuards,
  Request,
} from '@nestjs/common';
// import validationUtil from '../../../util/validation';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUser, GoogleLoginUserDto } from './user.dto';
import { AuthService } from '../services/user.service';
import { IUser } from '../models/user';

import { AuthMiddleware } from '../../../middleware/authenticated.middleware';
import { HttpExceptionFilter } from '../../../middleware/err.Middleware';
import { AuthGuard } from '@nestjs/passport';
import { HttpUser } from '../decorator/http-user.decorator';
import { Response } from 'express';

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
  async login(@Body() req: any, @Res() res) {
    const result = await this.authService.login(
      req.email,
      req.password,
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
  // @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async loginWithCredentials(@Body() req: any, @Res() res) {
    // if (
    //   !validationUtil.exists(req.credentialTokenUuid) ||
    //   !validationUtil.isUuid(req.credentialTokenUuid)
    // ) {
    //   return new HttpException(
    //     'validationUtil/credentialTokenUuid',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

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
  // @UseGuards(AuthGuard('google'))
  @Get('/')
  googleAuthRedirect(@HttpUser() user: GoogleLoginUserDto, @Request() req) {
    return true;
  }
}
