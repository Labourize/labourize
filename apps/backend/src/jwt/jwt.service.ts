import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { TJwtTokenPayload } from './interfaces';

@Injectable()
export class JwtService {
  constructor(private config: ConfigService) {}

  public generateToken(payload: TJwtTokenPayload): string {
    return jwt.sign(
      {
        ...payload
      },
      this.config.get('jwt.secret'),
      {
        algorithm: this.config.get('jwt.algorithm'),
        expiresIn: +this.config.get('jwt.ttl')
      }
    );
  }

  public isValid(token: string): unknown {
    return jwt.verify(token, this.config.get('jwt.public'), { algorithms: [this.config.get('algorithm')] });
  }

  public decode(idToken: string): unknown {
    return jwt.decode(idToken);
  }
}
