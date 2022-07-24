export class Login {
  constructor(public email: string, public password: string) {}
}

export interface LoginResponse {
  token: string;
}
