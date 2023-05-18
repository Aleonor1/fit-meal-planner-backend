import { Gender } from '../../models/Client/Gender';
import { Client } from '../../models/Client/Client';
import { ActivityLevel } from '../..//models/Client/ActivityLevel';
import { DietaryRestriction } from '../../models/Client/DietaryRestriction';
import { ClientStatus } from '../../models/user/ClientStatus';

export class ClientStub extends Client {
  goal: string;
  gender: Gender;
  activityLevel: ActivityLevel;
  height: number;
  weight: number;
  dietaryRestrictions: DietaryRestriction[];
  calorieTarget: number;
  macronutrientRatios: Record<string, number>;
  mealSchedule: Record<string, string>;
  waterIntake: number;
  allergies: string[];
  favoriteRecipes: string[];

  constructor() {
    super();
    this.userName = 'john.doe';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.email = 'john.doe@example.com';
    this.password =
      '$2b$10$BPmjxbwfEPMxUPRtCqgT9.sJK2msQPJaKTQJJX6ne7m03ksGGk5jO';
    this.status = ClientStatus.Active;
    this.dateOfBirth = new Date();
    this.phoneNumber = '1234567890';
    this.isAdmin = false;
    this.goal = 'lose_weight';
    this.gender = Gender.Male;
    this.activityLevel = ActivityLevel.ExtraActive;
    this.height = 180;
    this.weight = 75;
    (this.dietaryRestrictions = [
      DietaryRestriction.DairyFree,
      DietaryRestriction.GlutenFree,
    ]),
      (this.calorieTarget = 2000);
    this.macronutrientRatios = { carbs: 40, protein: 30, fat: 30 };
    this.mealSchedule = {
      breakfast: '08=00 AM',
      lunch: '12=00 PM',
      dinner: '06=00 PM',
    };
    this.waterIntake = 8;
    this.allergies = ['peanuts'];
    this.favoriteRecipes = [];
  }

  generateAccessToken(): string {
    return '';
  }

  validatePassword(password: string): boolean {
    return true;
  }
}
