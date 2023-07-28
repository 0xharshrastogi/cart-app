export interface Credentials {
  email: string;

  password: string;
}

export interface User extends Credentials {
  firstName: string;

  lastName: string;
}

export interface UserWithId extends User {
  id: string;
}

export interface IAuthApiService {
  signup(user: User): Promise<{
    user: UserWithId;
    token: string;
  }>;

  login(credential: Credentials): Promise<{
    user: UserWithId;
    token: string;
  }>;
}
