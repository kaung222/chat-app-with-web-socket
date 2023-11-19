export class CreateUserDto {
  role: 'admin' | 'user' | 'author' | 'super admin';
  email: string;
  password: string;
}
