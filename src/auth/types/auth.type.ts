export class RequestContext {
  sub: string;
  username: string;
  userId: string;
  email: string;
  roles?: string[];
}

export type RequestContextEnum = 'sub' | 'username' | 'userId' | 'roles';
