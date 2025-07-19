export interface JwtPayload {
  id: string;
  email: string;
  artistId?: string;
  iat?: number;
  exp?: number;
}
