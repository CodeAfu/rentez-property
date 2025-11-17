export interface TokenPayload {
  name: string;
  sub: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}
