export interface ITokenResponse {
    access_token: string;
    token_type: string;
  }

export interface ILoginBody {
    username: string;
    password: string;
  }