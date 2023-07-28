import { DocumentInstance, User } from '../common/types';

export class UserOutDTO {
  constructor(private readonly user: DocumentInstance<User>) {}

  toJSON() {
    return {
      id: this.user._id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
    };
  }
}
