import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { Claims, IJsonWebTokenService } from '../common/types';

interface ApplicationJwtServiceConfig {
  secret: string | Buffer;
  expireInSecond: number;
}

export class ApplicationJwtService implements IJsonWebTokenService {
  constructor(private readonly config: ApplicationJwtServiceConfig) {}

  encode(claims: Claims): string {
    return jsonwebtoken.sign(claims, this.config.secret, {
      expiresIn: this.config.expireInSecond,
    });
  }

  verify(token: string): JwtPayload {
    const payload = jsonwebtoken.verify(
      token,
      this.config.secret
    ) as JwtPayload;

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new Error('token expired');
    }

    return payload;
  }
}
