import { IAuthApiService, User, UserWithId } from '@/shared/types';
import axios from 'axios';

const ErrMsgSomethingWentWrong = 'Something went wrong';
export class AuthenticationApiService implements IAuthApiService {
  private static readonly instance = axios.create({
    baseURL: 'http://localhost:8081/api/auth',
  });

  async signup(user: User): Promise<{ user: UserWithId; token: string }> {
    try {
      const response = await AuthenticationApiService.instance.post<{
        user: UserWithId;
        token: string;
      }>('/signup', user);

      return response.data;
    } catch (error) {
      if (!axios.isAxiosError(error)) throw new Error(ErrMsgSomethingWentWrong);
      const message =
        error.response?.data['message'] ?? ErrMsgSomethingWentWrong;
      throw new Error(message);
    }
  }
}
