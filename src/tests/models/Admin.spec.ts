import { Admin } from '../../models/Admin/Admin';

describe('Admin', () => {
  let admin: Admin;

  beforeEach(() => {
    admin = new Admin();
  });

  it('should be an instance of Admin', () => {
    expect(admin).toBeInstanceOf(Admin);
  });

  it('should have the default value for isAdmin', () => {
    expect(admin.isAdmin).toBe(true);
  });

  it('should implement the abstract methods', () => {
    expect(() => admin.generateAccessToken()).toThrowError(
      'Method not implemented.',
    );
    expect(() => admin.validatePassword('password')).toThrowError(
      'Method not implemented.',
    );
  });
});
