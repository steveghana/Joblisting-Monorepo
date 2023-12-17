import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';

@Injectable()
export class GoogleAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.body.accessToken;
    console.log('Google middleware entered.....................');
    if (!accessToken) {
      throw new HttpException('Unauthorised', HttpStatus.BAD_REQUEST);
    }

    try {
      console.log('Verifying access token...');
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
      );
      const data = await response.json();

      if (data.error) {
        throw new HttpException(data.error_description, HttpStatus.BAD_REQUEST);
      }

      const additionalInfo = await this.fetchAdditionalUserInfo(accessToken);
      req.body.user = {
        accessToken,
        ...data,
        ...additionalInfo,
      };
      next();
    } catch (error) {
      console.error('Error during token verification:', error);
      throw new HttpException('Invalid access token', HttpStatus.BAD_REQUEST);
    }
  }

  private async fetchAdditionalUserInfo(accessToken: string) {
    const url =
      'https://people.googleapis.com/v1/people/me?personFields=names,photos,phoneNumbers,nicknames,locations,addresses';

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Google profile: ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log('userdata:', data);
      return data;
    } catch (error) {
      console.error('Error fetching Google profile:', error.message);
      throw error;
    }
  }
}
