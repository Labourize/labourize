import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { TRequestUser } from '../auth/user.decorator';
// import { AuthorizationError } from '../errors/authorization-error';
// import { errorCodes } from '../errors/utils';
import { UserService } from '../user/services';
import { TRequestUser } from './interfaces';
import * as fs from 'fs';

export interface IUserPayload {
  iat: number;
  userId: string;
  otp: string;
}

export type TJwtPayload = IUserPayload;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    /**
     * NOTE: User repository injected here just
     * do not inject any other dependencies as:
     * - User Module (whole module)
     * - or User Service (Cognito)
     * In JWTService users repository cannot be injected
     * because in this situation we have to inject UserRepository
     * in every service where we want to use JWTService.
     * Point to think about this
     */
    private readonly userService: UserService
  ) {
    super({
      // eslint-disable-next-line
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: fs.readFileSync(config.get<string>('jwt.public'), 'utf8')//config.get<string>('jwt.public')
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async validate(payload: TJwtPayload): Promise<TRequestUser> {
      const user = await this.userService.getUserEntity(payload.userId);

      // const isLoggedOut = +user.loggedOut > +payload.iat;

      // if (isLoggedOut) {
      //   throw new AuthorizationError({
      //     code: errorCodes.AUTHORIZATION_JWT_TOKEN_REVOKED
      //   });
      // }
      
      const isValid = await this.userService.validateUserOtp(payload.userId, payload.otp)
      if (!isValid) {
        throw new Error('Invalid otp');
        // TODO: Handle this case
        // throw new AuthorizationError({
        //   code: errorCodes.AUTHORIZATION_NOT_AUTHORIZED
        // });
      }

      return {userId: payload.userId, otp: user.otp};
  }
}
