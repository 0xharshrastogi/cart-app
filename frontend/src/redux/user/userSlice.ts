import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserNotLoggedIn = {
  isLoggedIn: false;
};

type TUserProps =
  | UserNotLoggedIn
  | {
      isLoggedIn: true;
      token: string;
      info: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
      };
    };

interface UserState {
  user: TUserProps;
}

const initialState: UserState = {
  user: {
    isLoggedIn: false,
  },
};

type TSetUserProps = {
  token: string;
  info: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserAuthenticate: (_, action: PayloadAction<TSetUserProps>) => {
      return { user: { isLoggedIn: true, ...action.payload } };
    },

    logout: () => {
      return { user: { isLoggedIn: false } } as UserState;
    },
  },
});
