export interface User {
  firstName: string;

  lastName: string;

  email: string;

  password: string;
}

export interface IPasswordService {
  hash(text: string): Promise<string>;

  validate(text: string, hashed: string): Promise<boolean>;
}
