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
