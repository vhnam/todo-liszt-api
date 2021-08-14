export interface IToken {
  usr: string;
  iat: number;
  exp: number;
}

export interface IJWTToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  refreshToken: string;
}
