import { Client } from '../../models/Client/Client';

describe('Client', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client();
  });

  it('should be an instance of Client', () => {
    expect(client).toBeInstanceOf(Client);
  });

  it('should have all the defined fields', () => {
    expect(client.goal).toBeUndefined();
    expect(client.activityLevel).toBeUndefined();
    expect(client.height).toBeUndefined();
    expect(client.weight).toBeUndefined();
    expect(client.age).toBeUndefined();
    expect(client.gender).toBeUndefined();
    expect(client.dietaryRestrictions).toBeUndefined();
    expect(client.calorieTarget).toBeUndefined();
    expect(client.macronutrientRatios).toBeUndefined();
    expect(client.mealSchedule).toBeUndefined();
    expect(client.waterIntake).toBeUndefined();
    expect(client.allergies).toBeUndefined();
    expect(client.favoriteRecipes).toBeUndefined();
  });

  it('should implement the abstract methods', () => {
    expect(() => client.generateAccessToken()).toThrowError(
      'Method not implemented.',
    );
    expect(() => client.validatePassword('password')).toThrowError(
      'Method not implemented.',
    );
  });
});
