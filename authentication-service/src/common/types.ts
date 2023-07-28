import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface Credential {
  email: string;

  password: string;
}

export interface User extends Credential {
  firstName: string;

  lastName: string;
}

export interface IPasswordService {
  hash(text: string): Promise<string>;

  validate(text: string, hashed: string): Promise<boolean>;
}

export type Claims = {
  [key: string]: unknown;
};

export interface IJsonWebTokenService {
  encode(claims: Claims): string;

  verify(token: string): JwtPayload;
}

export type DocumentInstance<T extends object> = T & { _id: Types.ObjectId };
