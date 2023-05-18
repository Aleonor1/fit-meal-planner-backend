import { Gender } from '../../models/Client/Gender';
import { ClientStatus } from '../../models/user/ClientStatus';
import { DietaryRestriction } from '../../models/Client/DietaryRestriction';
import { ClientBuilder } from '../../Builders/ClientBuilder';
import { ActivityLevel } from '../../models/Client/ActivityLevel';

describe('ClientBuilder', () => {
  let clientBuilder: ClientBuilder;

  beforeEach(() => {
    clientBuilder = new ClientBuilder();
  });

  it('should build a client with provided values', () => {
    const client = clientBuilder
      .withUserName('john.doe')
      .withFirstName('John')
      .withLastName('Doe')
      .withEmail('john.doe@example.com')
      .withPassword('mypassword')
      .withStatus(ClientStatus.Active)
      .withDateOfBirth(new Date('2023-05-31'))
      .withPhoneNumber('123456789')
      .withAdminStatus(false)
      .withGoal('Fitness')
      .withGender('Male')
      .withActivityLevel(ActivityLevel.Moderate)
      .withHeight(175)
      .withWeight(75)
      .withDietaryRestrictions([
        DietaryRestriction.Vegetarian,
        DietaryRestriction.GlutenFree,
      ])
      .withCalorieTarget(2000)
      .withMacronutrientRatios({ carbs: 50, protein: 30, fat: 20 })
      .withMealSchedule({
        breakfast: '08:00 AM',
        lunch: '12:00 PM',
        dinner: '06:00 PM',
      })
      .withWaterIntake(2000)
      .withAllergies(['Peanuts', 'Shellfish'])
      .withFavoriteRecipes(['Spaghetti Bolognese', 'Chicken Stir-Fry'])
      .build();

    expect(client.userName).toBe('john.doe');
    expect(client.firstName).toBe('John');
    expect(client.lastName).toBe('Doe');
    expect(client.email).toBe('john.doe@example.com');
    expect(client.password).toBe('mypassword');
    expect(client.status).toBe(ClientStatus.Active);
    expect(client.dateOfBirth).toEqual(new Date('2023-05-31'));
    expect(client.phoneNumber).toBe('123456789');
    expect(client.isAdmin).toBe(false);
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
});
