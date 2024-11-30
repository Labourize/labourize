export interface TJwtTokenPayload {
  userId: string;
  otp: string;
}

export interface TRequestUser extends TJwtTokenPayload {}