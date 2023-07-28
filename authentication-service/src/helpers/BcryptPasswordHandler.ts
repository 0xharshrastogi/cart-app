import bcrypt from 'bcrypt';
import { IPasswordService } from '../common/types';
import { APP_PASSWORD_SALT_ROUNDS } from '../config';

export class BcryptPassword implements IPasswordService {
  async hash(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(APP_PASSWORD_SALT_ROUNDS);
    return await bcrypt.hash(text, salt);
  }

  async validate(text: string, hashed: string) {
    return await bcrypt.compare(text, hashed);
  }
}
