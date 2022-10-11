import { ReactNode, Dispatch } from 'react';
import { User, Users } from './users';

//Context Types Information
export interface ContextProps {
  get: {
    users: Users;
    getActiveUser: () => User | undefined;
  };
  set: {
    dispatchUsers: Dispatch<Action>;
  };
}

export interface ProviderProps {
  children: ReactNode;
}

export type Action =
  | {
      type: 'gainExperience';
      payload: { id: number; experienceBlocks: number };
    }
  | {
      type: 'changeActive';
      payload: { id: number };
    };
