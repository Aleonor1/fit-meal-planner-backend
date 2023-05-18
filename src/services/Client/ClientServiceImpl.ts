import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ClientService } from './ClientService';
import { Client } from '../../models/Client/Client';
import { ClientRepositoryImpl } from '../../repositories/ClientRepositoryImpl';
import { CLIENT_PROPERTIES } from '../../models/Client/ClientProperties';
import { ClientRegistrationDto } from '../../DTOS/ClientRegistrationDto';
import { ClientBuilder } from '../../Builders/ClientBuilder';
import { Gender } from '../../models/Client/Gender';
import { DietaryRestriction } from '../../models/Client/DietaryRestriction';
import { ActivityLevel } from '../../models/Client/ActivityLevel';

@Injectable()
export class ClientServiceImpl implements ClientService {
  constructor(
    @Inject(ClientRepositoryImpl)
    private clientsRepository: ClientRepositoryImpl,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async findBy(property: keyof Client, value: string) {
    return this.clientsRepository.findBy(property, value);
  }

  async findOne(id: string): Promise<Client> {
    return this.clientsRepository.findBy(CLIENT_PROPERTIES.id, id);
  }

  async remove(id: string): Promise<void> {
    await this.clientsRepository.deleteClient(id);
  }

  private getEnumValueFromString<T>(
    enumType: T,
    stringValue: string,
  ): T[keyof T] | undefined {
    const enumValues = Object.values(enumType) as unknown as T[keyof T][];
    const enumKey = enumValues.find((value) => value === stringValue);

    return enumKey;
  }

  async create(clientDto: ClientRegistrationDto): Promise<Client> {
    const dietaryRestrictions = clientDto.dietaryRestrictions.map(
      (restriction) =>
        this.getEnumValueFromString(DietaryRestriction, restriction),
    );
    const client: Client = new ClientBuilder()
      .withUserName(clientDto.userName)
      .withFirstName(clientDto.firstName)
      .withLastName(clientDto.lastName)
      .withEmail(clientDto.email)
      .withPassword(await this.hashPassword(clientDto.password))
      .withStatus(clientDto.status)
      .withDateOfBirth(clientDto.dateOfBirth)
      .withPhoneNumber(clientDto.phoneNumber)
      .withAdminStatus(clientDto.isAdmin)
      .withGoal(clientDto.goal)
      .withGender(this.getEnumValueFromString(Gender, clientDto.gender))
      .withActivityLevel(
        this.getEnumValueFromString(ActivityLevel, clientDto.activityLevel),
      )
      .withHeight(clientDto.height)
      .withWeight(clientDto.weight)
      .withDietaryRestrictions(dietaryRestrictions)
      .withCalorieTarget(clientDto.calorieTarget)
      .withMacronutrientRatios(clientDto.macronutrientRatios)
      .withMealSchedule(clientDto.mealSchedule)
      .withWaterIntake(clientDto.waterIntake)
      .withAllergies(clientDto.allergies)
      .withFavoriteRecipes(clientDto.favoriteRecipes)
      .build();

    return this.clientsRepository.createClient(client);
  }

  async update(id: string, client: Client): Promise<Client> {
    if (client.password) {
      client.password = await this.hashPassword(client.password);
    }
    const toUpdate = await this.clientsRepository.findBy(
      CLIENT_PROPERTIES.id,
      id,
    );
    const updated = Object.assign(toUpdate, client);
    return this.clientsRepository.updateClient(id, updated);
  }

  async validatePassword(id: string, password: string): Promise<boolean> {
    const client = await this.clientsRepository.findBy(
      CLIENT_PROPERTIES.id,
      id,
    );
    if (client) {
      return await bcrypt.compare(password, client.password);
    }
    return false;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
}
