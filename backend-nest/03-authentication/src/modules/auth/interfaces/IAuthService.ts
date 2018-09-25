export interface IAuthService {
  options: JwtOptions;

  /**
   * @description: Sign the user, create a new token before it insert in the response header Authorization.
   * @param {email: string; password: string} credentials
   * @return {Promise<string>}
   */
  sign(credentials: { username_email: string; password: string }): Promise<string>;
}

export interface JwtOptions {
  algorithm: string;
  expiresIn: number | string;
  jwtid: string;
}
