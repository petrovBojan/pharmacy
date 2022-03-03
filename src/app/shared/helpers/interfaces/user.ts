export interface User {
  email: string;
  email_verified: number;
  provider: string
  roles: Roles;
  jwtToken?: string;

}
export interface Roles {
  user: boolean;
}
