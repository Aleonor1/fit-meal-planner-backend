import { Gender } from '../../models/Client/Gender';
import { Client } from '../../models/Client/Client';
import { ActivityLevel } from '../../models/Client/ActivityLevel';
import { DietaryRestriction } from '../../models/Client/DietaryRestriction';

describe('Client', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client();
  });

  it('should be an instance of Client', () => {
    expect(client).toBeInstanceOf(Client);
  });

  it('should have default values', () => {
    expect(client.goal).toBeUndefined();
    expect(client.gender).toBeUndefined;
    expect(client.activityLevel).toBeUndefined;
    expect(client.height).toBeUndefined();
    expect(client.weight).toBeUndefined();
    expect(client.dietaryRestrictions).toBeUndefined();
    expect(client.calorieTarget).toBeUndefined();
    expect(client.macronutrientRatios).toBeUndefined();
    expect(client.mealSchedule).toBeUndefined();
    expect(client.waterIntake).toBeUndefined();
    expect(client.allergies).toBeUndefined();
    expect(client.favoriteRecipes).toBeUndefined();
  });

  it('should allow setting and getting values', () => {
    client.goal = 'Fitness';
    client.gender = Gender.Male;
    client.activityLevel = ActivityLevel.Moderate;
    client.height = 175;
    client.weight = 75;
    client.dietaryRestrictions = [
      DietaryRestriction.Vegetarian,
      DietaryRestriction.GlutenFree,
    ];
    client.calorieTarget = 2000;
    client.macronutrientRatios = { carbs: 50, protein: 30, fat: 20 };
    client.mealSchedule = {
      breakfast: '08:00 AM',
      lunch: '12:00 PM',
      dinner: '06:00 PM',
    };
    client.waterIntake = 2000;
    client.allergies = ['Peanuts', 'Shellfish'];
    client.favoriteRecipes = ['Spaghetti Bolognese', 'Chicken Stir-Fry'];

    expect(client.goal).toBe('Fitness');
    expect(client.gender).toBe(Gender.Male);
    expect(client.activityLevel).toBe(ActivityLevel.Moderate);
    expect(client.height).toBe(175);
    expect(client.weight).toBe(75);
    expect(client.dietaryRestrictions).toEqual([
      DietaryRestriction.Vegetarian,
      DietaryRestriction.GlutenFree,
    ]);
    expect(client.calorieTarget).toBe(2000);
    expect(client.macronutrientRatios).toEqual({
      carbs: 50,
      protein: 30,
      fat: 20,
    });
    expect(client.mealSchedule).toEqual({
      breakfast: '08:00 AM',
      lunch: '12:00 PM',
      dinner: '06:00 PM',
    });
    expect(client.waterIntake).toBe(2000);
    expect(client.allergies).toEqual(['Peanuts', 'Shellfish']);
    expect(client.favoriteRecipes).toEqual([
      'Spaghetti Bolognese',
      'Chicken Stir-Fry',
    ]);
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
