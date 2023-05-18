import { Client } from 'src/models/Client/Client';
import { ClientRepositoryImpl } from 'src/repositories/ClientRepositoryImpl';
import {
  RemoveOptions,
  RemoveOptions,
  RemoveOptions,
  RemoveOptions,
  RemoveOptions,
  Repository,
  SaveOptions,
  SaveOptions,
  SaveOptions,
  SaveOptions,
  SaveOptions,
  SelectQueryBuilder,
} from 'typeorm';
import { ClientStub } from '../Stubs/ClientStub';
import { Gender } from 'src/models/Client/Gender';
import { ActivityLevel } from 'src/models/Client/ActivityLevel';
import { ClientStatus } from 'src/models/user/ClientStatus';

class MockClientRepository
  extends Repository<Client>
  implements Partial<SelectQueryBuilder<Client>>
{
  constructor() {
    super();
  }

  createQueryBuilder(alias?: string, queryRunner?: any) {
    return this as unknown as SelectQueryBuilder<Client>;
  }

  where() {
    return this as unknown as SelectQueryBuilder<Client>;
  }

  getMany() {
    return [] as Client[];
  }

  getOne() {
    return {} as Client;
  }

  save() {
    return {} as Client;
  }

  delete() {
    return {} as any;
  }
}

describe('ClientRepositoryImpl', () => {
  let clientRepository: ClientRepositoryImpl;
  let mockClientRepository: jest.Mocked<Repository<Client>>;

  beforeEach(() => {
    mockClientRepository = {
      createQueryBuilder: jest.fn(),
      where: jest.fn(),
      getMany: jest.fn(),
      getOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    clientRepository = new ClientRepositoryImpl(mockClientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should return an array of clients', async () => {
      const mockClients: Client[] = [new ClientStub(), new ClientStub()];
      mockClientRepository.createQueryBuilder.mockReturnValueOnce(
        mockClientRepository,
      );
      mockClientRepository.getMany.mockResolvedValueOnce(mockClients);

      const result = await clientRepository.find();

      expect(mockClientRepository.createQueryBuilder).toHaveBeenCalledWith(
        'client',
      );
      expect(mockClientRepository.getMany).toHaveBeenCalled();
      expect(result).toEqual(mockClients);
    });
  });

  describe('findByUsername', () => {
    it('should return a client with the specified username', async () => {
      const username = 'john.doe';
      const mockClient: Client = {
        id: '1',
        userName: username,
        generateAccessToken: function (): string {
          throw new Error('Function not implemented.');
        },
        validatePassword: function (password: string): boolean {
          throw new Error('Function not implemented.');
        },
        goal: '',
        gender: Gender.Male,
        activityLevel: ActivityLevel.Sedentary,
        height: 0,
        weight: 0,
        dietaryRestrictions: [],
        calorieTarget: 0,
        macronutrientRatios: undefined,
        mealSchedule: undefined,
        waterIntake: 0,
        allergies: [],
        favoriteRecipes: [],
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        status: ClientStatus.Active,
        dateOfBirth: undefined,
        phoneNumber: '',
        isAdmin: false,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };
      mockClientRepository.createQueryBuilder.mockReturnValueOnce(
        mockClientRepository,
      );
      mockClientRepository.where.mockReturnValueOnce(mockClientRepository);
      mockClientRepository.getOne.mockResolvedValueOnce(mockClient);

      const result = await clientRepository.findByUsername(username);

      expect(mockClientRepository.createQueryBuilder).toHaveBeenCalledWith(
        'client',
      );
      expect(mockClientRepository.where).toHaveBeenCalledWith(
        'client.username = :username',
        { username },
      );
      expect(mockClientRepository.getOne).toHaveBeenCalled();
      expect(result).toEqual(mockClient);
    });
  });

  describe('findBy', () => {
    it('should return a client with the specified property and value', async () => {
      const property: keyof Client = CLIENT_PROPERTIES.id;
      const value = '1';
      const mockClient: Client = {
        id: value,
        userName: 'john.doe',
        generateAccessToken: function (): string {
          throw new Error('Function not implemented.');
        },
        validatePassword: function (password: string): boolean {
          throw new Error('Function not implemented.');
        },
        goal: '',
        gender:
          '/Users/I561100/Desktop/FitMealPlanner/fit-meal-planner-backend/src/models/Client/Gender'
            .Male,
        activityLevel:
          '/Users/I561100/Desktop/FitMealPlanner/fit-meal-planner-backend/src/models/Client/ActivityLevel'
            .Sedentary,
        height: 0,
        weight: 0,
        dietaryRestrictions: [],
        calorieTarget: 0,
        macronutrientRatios: undefined,
        mealSchedule: undefined,
        waterIntake: 0,
        allergies: [],
        favoriteRecipes: [],
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        status:
          '/Users/I561100/Desktop/FitMealPlanner/fit-meal-planner-backend/src/models/user/ClientStatus'
            .Active,
        dateOfBirth: undefined,
        phoneNumber: '',
        isAdmin: false,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };
      mockClientRepository.createQueryBuilder.mockReturnValueOnce(
        mockClientRepository,
      );
      mockClientRepository.where.mockReturnValueOnce(mockClientRepository);
      mockClientRepository.getOne.mockResolvedValueOnce(mockClient);

      const result = await clientRepository.findBy(property, value);

      expect(mockClientRepository.createQueryBuilder).toHaveBeenCalledWith(
        'client',
      );
      expect(mockClientRepository.where).toHaveBeenCalledWith(
        `client.${property} = :value`,
        { value },
      );
      expect(mockClientRepository.getOne).toHaveBeenCalled();
      expect(result).toEqual(mockClient);
    });
  });

  describe('createClient', () => {
    it('should save and return the created client', async () => {
      const clientData: Client = {
        id: '1',
        userName: 'john.doe',
        generateAccessToken: function (): string {
          throw new Error('Function not implemented.');
        },
        validatePassword: function (password: string): boolean {
          throw new Error('Function not implemented.');
        },
        goal: '',
        gender:
          '/Users/I561100/Desktop/FitMealPlanner/fit-meal-planner-backend/src/models/Client/Gender'
            .Male,
        activityLevel:
          '/Users/I561100/Desktop/FitMealPlanner/fit-meal-planner-backend/src/models/Client/ActivityLevel'
            .Sedentary,
        height: 0,
        weight: 0,
        dietaryRestrictions: [],
        calorieTarget: 0,
        macronutrientRatios: undefined,
        mealSchedule: undefined,
        waterIntake: 0,
        allergies: [],
        favoriteRecipes: [],
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        status:
          '/Users/I561100/Desktop/FitMealPlanner/fit-meal-planner-backend/src/models/user/ClientStatus'
            .Active,
        dateOfBirth: undefined,
        phoneNumber: '',
        isAdmin: false,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };
      const mockCreatedClient: Client = {
        ...clientData,
        generateAccessToken: function (): string {
          throw new Error('Function not implemented.');
        },
        validatePassword: function (password: string): boolean {
          throw new Error('Function not implemented.');
        },
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };
      mockClientRepository.save.mockResolvedValueOnce(mockCreatedClient);

      const result = await clientRepository.createClient(clientData);

      expect(mockClientRepository.save).toHaveBeenCalledWith(clientData);
      expect(result).toEqual(mockCreatedClient);
    });
  });

  describe('updateClient', () => {
    it('should update and return the updated client if it exists', async () => {
      const id = '1';
      const clientData: Partial<Client> = { userName: 'john.doe' };
      const mockExistingClient: Client = {
        id,
        userName: 'jane.doe',
        generateAccessToken: function (): string {
          throw new Error('Function not implemented.');
        },
        validatePassword: function (password: string): boolean {
          throw new Error('Function not implemented.');
        },
        goal: '',
        gender:
          '/Users/I561100/Desktop/FitMealPlanner/fit-meal-planner-backend/src/models/Client/Gender'
            .Male,
        activityLevel:
          '/Users/I561100/Desktop/FitMealPlanner/fit-meal-planner-backend/src/models/Client/ActivityLevel'
            .Sedentary,
        height: 0,
        weight: 0,
        dietaryRestrictions: [],
        calorieTarget: 0,
        macronutrientRatios: undefined,
        mealSchedule: undefined,
        waterIntake: 0,
        allergies: [],
        favoriteRecipes: [],
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        status:
          '/Users/I561100/Desktop/FitMealPlanner/fit-meal-planner-backend/src/models/user/ClientStatus'
            .Active,
        dateOfBirth: undefined,
        phoneNumber: '',
        isAdmin: false,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Client> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };
      const mockUpdatedClient: Client = { id, ...clientData };
      mockClientRepository.findBy.mockResolvedValueOnce(mockExistingClient);
      mockClientRepository.save.mockResolvedValueOnce(mockUpdatedClient);

      const result = await clientRepository.updateClient(id, clientData);

      expect(mockClientRepository.findBy).toHaveBeenCalledWith(
        CLIENT_PROPERTIES.id,
        id,
      );
      expect(mockClientRepository.save).toHaveBeenCalledWith(
        mockExistingClient,
      );
      expect(result).toEqual(mockUpdatedClient);
    });

    it('should return undefined if the client to update does not exist', async () => {
      const id = '1';
      const clientData: Partial<Client> = { userName: 'john.doe' };
      mockClientRepository.findBy.mockResolvedValueOnce(undefined);

      const result = await clientRepository.updateClient(id, clientData);

      expect(mockClientRepository.findBy).toHaveBeenCalledWith(
        CLIENT_PROPERTIES.id,
        id,
      );
      expect(mockClientRepository.save).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('deleteClient', () => {
    it('should delete the client and return true if it exists', async () => {
      const id = '1';
      const mockDeleteResult = { affected: 1 };
      mockClientRepository.delete.mockResolvedValueOnce(mockDeleteResult);

      const result = await clientRepository.deleteClient(id);

      expect(mockClientRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it('should return false if the client to delete does not exist', async () => {
      const id = '1';
      const mockDeleteResult = { affected: 0 };
      mockClientRepository.delete.mockResolvedValueOnce(mockDeleteResult);

      const result = await clientRepository.deleteClient(id);

      expect(mockClientRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(false);
    });
  });
});
