import { ActivityLevel } from '../models/Client/ActivityLevel';
import { Client } from '../models/Client/Client';
import { DietaryRestriction } from '../models/Client/DietaryRestriction';
import { Gender } from '../models/Client/Gender';
import { ClientStatus } from '../models/user/ClientStatus';

export class ClientBuilder {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  withUserName(userName: string): ClientBuilder {
    this.client.userName = userName;
    return this;
  }

  withFirstName(firstName: string): ClientBuilder {
    this.client.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): ClientBuilder {
    this.client.lastName = lastName;
    return this;
  }

  withEmail(email: string): ClientBuilder {
    this.client.email = email;
    return this;
  }

  withPassword(password: string): ClientBuilder {
    this.client.password = password;
    return this;
  }

  withStatus(status: ClientStatus): ClientBuilder {
    this.client.status = status;
    return this;
  }

  withDateOfBirth(dateOfBirth: Date): ClientBuilder {
    this.client.dateOfBirth = dateOfBirth;
    return this;
  }

  withPhoneNumber(phoneNumber: string): ClientBuilder {
    this.client.phoneNumber = phoneNumber;
    return this;
  }

  withAdminStatus(isAdmin: boolean): ClientBuilder {
    this.client.isAdmin = isAdmin;
    return this;
  }

  withGoal(goal: string): ClientBuilder {
    this.client.goal = goal;
    return this;
  }

  withGender(gender: string): ClientBuilder {
    this.client.gender = Gender.Male;
    return this;
  }

  withActivityLevel(activityLevel: ActivityLevel): ClientBuilder {
    this.client.activityLevel = activityLevel;
    return this;
  }

  withHeight(height: number): ClientBuilder {
    this.client.height = height;
    return this;
  }

  withWeight(weight: number): ClientBuilder {
    this.client.weight = weight;
    return this;
  }

  withDietaryRestrictions(
    dietaryRestrictions: DietaryRestriction[],
  ): ClientBuilder {
    this.client.dietaryRestrictions = dietaryRestrictions;
    return this;
  }

  withCalorieTarget(calorieTarget: number): ClientBuilder {
    this.client.calorieTarget = calorieTarget;
    return this;
  }

  withMacronutrientRatios(
    macronutrientRatios: Record<string, number>,
  ): ClientBuilder {
    this.client.macronutrientRatios = macronutrientRatios;
    return this;
  }

  withMealSchedule(mealSchedule: Record<string, string>): ClientBuilder {
    this.client.mealSchedule = mealSchedule;
    return this;
  }

  withWaterIntake(waterIntake: number): ClientBuilder {
    this.client.waterIntake = waterIntake;
    return this;
  }

  withAllergies(allergies: string[]): ClientBuilder {
    this.client.allergies = allergies;
    return this;
  }

  withFavoriteRecipes(favoriteRecipes: string[]): ClientBuilder {
    this.client.favoriteRecipes = favoriteRecipes;
    return this;
  }

  build(): Client {
    return this.client;
  }
}
