interface UserService {
  registerUser(user: {
    username: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
  }): Promise<any>;
}
