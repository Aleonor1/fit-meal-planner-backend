import { ClientRepositoryImpl } from '../../repositories/ClientRepositoryImpl';
import { Client } from '../../models/Client/Client';
import { CLIENT_PROPERTIES } from '../../models/Client/ClientProperties';
import { ClientStub } from '../Stubs/ClientStub';
import { ClientServiceImpl } from '../../services/Client/ClientServiceImpl';
import { ClientBuilder } from '../../Builders/ClientBuilder';
import { ClientRegistrationDto } from '../../DTOS/ClientRegistrationDto';
import { ClientStatus } from '../../models/user/ClientStatus';
import { ActivityLevel } from '../../models/Client/ActivityLevel';
import { DietaryRestriction } from '../../models/Client/DietaryRestriction';
import bcrypt from 'bcrypt';

describe('ClientServiceImpl', () => {
  let clientServiceImpl: ClientServiceImpl;
  let clientRepository: jest.Mocked<ClientRepositoryImpl>;

  beforeEach(() => {
    clientRepository = {
      find: jest.fn().mockResolvedValue([new ClientStub(), new ClientStub()]),
      findBy: jest.fn().mockResolvedValue(new ClientStub()),
      createClient: jest.fn().mockResolvedValue(new ClientStub()),
      updateClient: jest.fn().mockResolvedValue(new ClientStub()),
      deleteClient: jest.fn().mockResolvedValue(true),
    } as unknown as jest.Mocked<ClientRepositoryImpl>;

    jest.mock('bcrypt');
    clientServiceImpl = new ClientServiceImpl(clientRepository);
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const clients = await clientServiceImpl.findAll();

      expect(clientRepository.find).toHaveBeenCalledTimes(1);
      expect(clients).toHaveLength(2);
      expect(clients[0]).toBeInstanceOf(Client);
      expect(clients[1]).toBeInstanceOf(Client);
    });
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const clientDto: ClientRegistrationDto = {
        userName: 'john.doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'mypassword',
        status: ClientStatus.Active,
        dateOfBirth: new Date(),
        phoneNumber: '1234567890',
        isAdmin: false,
        goal: 'lose_weight',
        gender: 'male',
        activityLevel: ActivityLevel.ExtraActive,
        height: 180,
        weight: 75,
        dietaryRestrictions: [
          DietaryRestriction.DairyFree,
          DietaryRestriction.GlutenFree,
        ],
        calorieTarget: 2000,
        macronutrientRatios: { carbs: 40, protein: 30, fat: 30 },
        mealSchedule: {
          breakfast: '08:00 AM',
          lunch: '12:00 PM',
          dinner: '06:00 PM',
        },
        waterIntake: 8,
        allergies: ['peanuts'],
        favoriteRecipes: [],
      };

      const expectedClient = new ClientBuilder()
        .withUserName(clientDto.userName)
        .withFirstName(clientDto.firstName)
        .withLastName(clientDto.lastName)
        .withEmail(clientDto.email)
        .withPassword(clientDto.password)
        .withStatus(clientDto.status)
        .withDateOfBirth(clientDto.dateOfBirth)
        .withPhoneNumber(clientDto.phoneNumber)
        .withAdminStatus(clientDto.isAdmin)
        .withGoal(clientDto.goal)
        .withGender('extra_active')
        .withActivityLevel(ActivityLevel.ExtraActive)
        .withHeight(clientDto.height)
        .withWeight(clientDto.weight)
        .withDietaryRestrictions([
          DietaryRestriction.DairyFree,
          DietaryRestriction.GlutenFree,
        ])
        .withCalorieTarget(clientDto.calorieTarget)
        .withMacronutrientRatios(clientDto.macronutrientRatios)
        .withMealSchedule(clientDto.mealSchedule)
        .withWaterIntake(clientDto.waterIntake)
        .withAllergies(clientDto.allergies)
        .withFavoriteRecipes(clientDto.favoriteRecipes)
        .build();

      const createClientSpy = jest.spyOn(clientRepository, 'createClient');

      const createdClient = await clientServiceImpl.create(clientDto);

      expect(createClientSpy).toHaveBeenCalledTimes(1);

      expect(createClientSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          userName: expectedClient.userName,
          firstName: expectedClient.firstName,
          lastName: expectedClient.lastName,
          email: expectedClient.email,
          status: expectedClient.status,
          dateOfBirth: expectedClient.dateOfBirth,
          phoneNumber: expectedClient.phoneNumber,
          isAdmin: expectedClient.isAdmin,
          goal: expectedClient.goal,
          gender: expectedClient.gender,
          activityLevel: expectedClient.activityLevel,
          height: expectedClient.height,
          weight: expectedClient.weight,
          dietaryRestrictions: expect.arrayContaining(
            expectedClient.dietaryRestrictions,
          ),
          calorieTarget: expectedClient.calorieTarget,
          macronutrientRatios: expectedClient.macronutrientRatios,
          mealSchedule: expectedClient.mealSchedule,
          waterIntake: expectedClient.waterIntake,
          allergies: expectedClient.allergies,
          favoriteRecipes: expectedClient.favoriteRecipes,
        }),
      );

      expect(createdClient.userName).toBe(expectedClient.userName);
      expect(createdClient.firstName).toBe(expectedClient.firstName);
      expect(createdClient.lastName).toBe(expectedClient.lastName);
      expect(createdClient.email).toBe(expectedClient.email);
      expect(createdClient.status).toBe(expectedClient.status);
      expect(createdClient.phoneNumber).toBe(expectedClient.phoneNumber);
      expect(createdClient.isAdmin).toBe(expectedClient.isAdmin);
      expect(createdClient.goal).toBe(expectedClient.goal);
      expect(createdClient.gender).toBe(expectedClient.gender);
      expect(createdClient.activityLevel).toBe(expectedClient.activityLevel);
      expect(createdClient.height).toBe(expectedClient.height);
      expect(createdClient.weight).toBe(expectedClient.weight);
      expect(createdClient.dietaryRestrictions).toEqual(
        expect.arrayContaining(expectedClient.dietaryRestrictions),
      );
      expect(createdClient.calorieTarget).toBe(expectedClient.calorieTarget);
    });
  });

  describe('findBy', () => {
    it('should return a client', async () => {
      const property: keyof Client = CLIENT_PROPERTIES.id;
      const value = '123';

      const client = await clientServiceImpl.findBy(property, value);

      expect(clientRepository.findBy).toHaveBeenCalledTimes(1);
      expect(clientRepository.findBy).toHaveBeenCalledWith(property, value);
      expect(client).toBeInstanceOf(Client);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const clientDto: ClientRegistrationDto = {
        userName: 'john.doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'mypassword',
        status: ClientStatus.Active,
        dateOfBirth: new Date(),
        phoneNumber: '1234567890',
        isAdmin: false,
        goal: 'lose_weight',
        gender: 'male',
        activityLevel: ActivityLevel.ExtraActive,
        height: 180,
        weight: 75,
        dietaryRestrictions: [
          DietaryRestriction.DairyFree,
          DietaryRestriction.GlutenFree,
        ],
        calorieTarget: 2000,
        macronutrientRatios: { carbs: 40, protein: 30, fat: 30 },
        mealSchedule: {
          breakfast: '08:00 AM',
          lunch: '12:00 PM',
          dinner: '06:00 PM',
        },
        waterIntake: 8,
        allergies: ['peanuts'],
        favoriteRecipes: [],
      };

      const expectedClient = new ClientBuilder()
        .withUserName(clientDto.userName)
        .withFirstName(clientDto.firstName)
        .withLastName(clientDto.lastName)
        .withEmail(clientDto.email)
        .withPassword(clientDto.password)
        .withStatus(clientDto.status)
        .withDateOfBirth(clientDto.dateOfBirth)
        .withPhoneNumber(clientDto.phoneNumber)
        .withAdminStatus(clientDto.isAdmin)
        .withGoal(clientDto.goal)
        .withGender('extra_active')
        .withActivityLevel(ActivityLevel.ExtraActive)
        .withHeight(clientDto.height)
        .withWeight(clientDto.weight)
        .withDietaryRestrictions([
          DietaryRestriction.DairyFree,
          DietaryRestriction.GlutenFree,
        ])
        .withCalorieTarget(clientDto.calorieTarget)
        .withMacronutrientRatios(clientDto.macronutrientRatios)
        .withMealSchedule(clientDto.mealSchedule)
        .withWaterIntake(clientDto.waterIntake)
        .withAllergies(clientDto.allergies)
        .withFavoriteRecipes(clientDto.favoriteRecipes)
        .build();

      const createClientSpy = jest.spyOn(clientRepository, 'createClient');
      const updateClientSpy = jest.spyOn(clientRepository, 'updateClient');

      const createdClient = await clientServiceImpl.create(clientDto);

      expect(createClientSpy).toHaveBeenCalledTimes(1);

      expect(createClientSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          userName: expectedClient.userName,
          firstName: expectedClient.firstName,
          lastName: expectedClient.lastName,
          email: expectedClient.email,
          status: expectedClient.status,
          dateOfBirth: expectedClient.dateOfBirth,
          phoneNumber: expectedClient.phoneNumber,
          isAdmin: expectedClient.isAdmin,
          goal: expectedClient.goal,
          gender: expectedClient.gender,
          activityLevel: expectedClient.activityLevel,
          height: expectedClient.height,
          weight: expectedClient.weight,
          dietaryRestrictions: expect.arrayContaining(
            expectedClient.dietaryRestrictions,
          ),
          calorieTarget: expectedClient.calorieTarget,
          macronutrientRatios: expectedClient.macronutrientRatios,
          mealSchedule: expectedClient.mealSchedule,
          waterIntake: expectedClient.waterIntake,
          allergies: expectedClient.allergies,
          favoriteRecipes: expectedClient.favoriteRecipes,
        }),
      );

      expect(createdClient.userName).toBe(expectedClient.userName);
      expect(createdClient.firstName).toBe(expectedClient.firstName);
      expect(createdClient.lastName).toBe(expectedClient.lastName);
      expect(createdClient.email).toBe(expectedClient.email);
      expect(createdClient.status).toBe(expectedClient.status);
      expect(createdClient.phoneNumber).toBe(expectedClient.phoneNumber);
      expect(createdClient.isAdmin).toBe(expectedClient.isAdmin);
      expect(createdClient.goal).toBe(expectedClient.goal);
      expect(createdClient.gender).toBe(expectedClient.gender);
      expect(createdClient.activityLevel).toBe(expectedClient.activityLevel);
      expect(createdClient.height).toBe(expectedClient.height);
      expect(createdClient.weight).toBe(expectedClient.weight);
      expect(createdClient.dietaryRestrictions).toEqual(
        expect.arrayContaining(expectedClient.dietaryRestrictions),
      );
      expect(createdClient.calorieTarget).toBe(expectedClient.calorieTarget);

      createdClient.lastName = 'Marius marcel';
      createdClient.firstName = 'Gheorghe';
      createdClient.userName = 'vasile';

      const updatedClient = await clientServiceImpl.update('1', createdClient);
      expect(updateClientSpy).toHaveBeenCalledTimes(1);

      const a = {
        activityLevel: 'extra_active',
        allergies: ['peanuts'],
        calorieTarget: 2000,
        dateOfBirth: '2023-05-17T12:44:23.867Z',
        dietaryRestrictions: ['DairyFree', 'GlutenFree'],
        email: 'john.doe@example.com',
        firstName: 'Gheorghe',
        gender: 'male',
        goal: 'lose_weight',
        height: 180,
        isAdmin: false,
        lastName: 'Marius marcel',
        macronutrientRatios: { carbs: 40, fat: 30, protein: 30 },
        mealSchedule: {
          breakfast: '08=00 AM',
          dinner: '06=00 PM',
          lunch: '12=00 PM',
        },
        password:
          '$2b$10$Frkuypap0T7LvWEqHSOna.RfPQpsJCWfonlsgc0vwvBLcgCEdICqS',
        phoneNumber: '1234567890',
        status: 'active',
        userName: 'vasile',
        waterIntake: 8,
        weight: 75,
      };
      expect(updateClientSpy).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({
          userName: a.userName,
          firstName: a.firstName,
          lastName: a.lastName,
          email: a.email,
          status: a.status,
          phoneNumber: a.phoneNumber,
          isAdmin: a.isAdmin,
          goal: a.goal,
          gender: a.gender,
          activityLevel: a.activityLevel,
          height: a.height,
          weight: a.weight,
          calorieTarget: a.calorieTarget,
          macronutrientRatios: a.macronutrientRatios,
          mealSchedule: a.mealSchedule,
          waterIntake: a.waterIntake,
          allergies: a.allergies,
        }),
      );
    });
  });
});
