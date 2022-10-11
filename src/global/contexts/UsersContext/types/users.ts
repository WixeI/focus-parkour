export interface Users {
  activeId: number;
  list: User[];
}

export interface User {
  id: number;
  name: string;
  experience: number;
}
