export interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
  tokenValidity: Date;
  character: Record<string, any>;
}
