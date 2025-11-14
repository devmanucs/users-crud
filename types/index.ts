export type Account = {
  id: number;
  email: string;
  password: string;
  name: string;
};

export type UserEntry = {
  id?: number;
  name: string;
  githubUsername: string;
};