import produce from 'immer';
import { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import { experienceBasePoints } from '../../utilities/handleExperience';
import { Users } from './types/users';
import { Action, ContextProps, ProviderProps } from './types/provider';

//Utility Information
const defaultState: Users = {
  activeId: 0,
  list: [
    {
      id: Math.round(Math.random() * 10000),
      name: 'Mia',
      experience: 0
    },
    {
      id: Math.round(Math.random() * 10000),
      name: 'Johnny',
      experience: 0
    }
  ]
};

const initialState = JSON.parse(
  localStorage.getItem('users') || JSON.stringify(defaultState)
) as Users;

function usersReducer(state: Users, action: Action) {
  switch (action.type) {
    case 'gainExperience':
      return produce(state, (draft) => {
        const item = draft.list.find((item) => item.id === action.payload.id);
        if (!item) return;
        const baseValue = experienceBasePoints(item.experience);
        item.experience += action.payload.experienceBlocks * baseValue;
      });
    case 'changeActive':
      return produce(state, (draft) => {
        draft.activeId = action.payload.id;
      });
    default:
      return state;
  }
}

//Context Information
const UsersContext = createContext({} as ContextProps);

export function UsersProvider({ children }: ProviderProps) {
  const [users, dispatchUsers] = useReducer(usersReducer, initialState);

  //Sets Active User if there is none
  useEffect(() => {
    if (!getActiveUser())
      dispatchUsers({ type: 'changeActive', payload: { id: users.list[0]?.id } });
  }, []);

  //Saves Changes in Local Storage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  //Utility Information
  function getActiveUser() {
    return users.list.find((item) => item.id === users.activeId);
  }

  //Return & Provider Values
  const providerValue = useMemo(() => {
    return { get: { users, getActiveUser }, set: { dispatchUsers } };
  }, []);

  return <UsersContext.Provider value={providerValue}>{children}</UsersContext.Provider>;
}

function useUsers() {
  const context = useContext(UsersContext);

  if (!context) throw new Error('useUsers must be used within OrderDetailsProvider');

  return context;
}

export default useUsers;
