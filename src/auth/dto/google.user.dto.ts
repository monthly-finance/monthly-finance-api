export class OauthUserDto {
  provider: OauthProvider;
  providerId: string;
  email: string;
  name: string;
  picture?: any;
}

export enum OauthProvider {
  GOOGLE = 'goolge',
}
