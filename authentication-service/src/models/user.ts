import { Schema, model } from 'mongoose';
import { User } from '../common/types';

interface UserDocument extends User, Document {}

const schema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    statics: {
      async findByUser(item: 'email' | 'id', value: string) {
        return await this.find({ [item]: value });
      },

      async signupUser(user: User): Promise<Error | null> {
        new UserCollection(user);
        return null;
      },
    },
  }
);

schema.static('findaq', async function (item: 'email' | 'id', value: string) {
  return await this.find({ [item]: value });
});

export const UserCollection = model<UserDocument>('User', schema);
