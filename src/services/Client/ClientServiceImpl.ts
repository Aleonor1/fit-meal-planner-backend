import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ClientBuilder } from '../../Builders/ClientBuilder';
import { ClientRegistrationDto } from '../../DTOS/ClientRegistrationDto';
import { Client } from '../../models/Client/Client';
import { CLIENT_PROPERTIES } from '../../models/Client/ClientProperties';
import { ClientStatus } from '../../models/user/ClientStatus';
import { ClientRepositoryImpl } from '../../repositories/ClientRepositoryImpl';
import { ClientService } from './ClientService';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class ClientServiceImpl implements ClientService {
  constructor(
    @Inject(ClientRepositoryImpl)
    private clientsRepository: ClientRepositoryImpl,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async getOne(id: string): Promise<Client> {
    const client = await this.findOne(id);
    if (!client) {
      throw new Error('Client not found');
    }
    return client;
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
    const client: Client = new ClientBuilder()
      .withUserName(clientDto.userName)
      .withFirstName(clientDto.firstName)
      .withLastName(clientDto.lastName)
      .withEmail(clientDto.email)
      .withPassword(await this.hashPassword(clientDto.password))
      .withStatus(ClientStatus.Pending)
      .withAdminStatus(false)
      .build();

    return this.clientsRepository.createClient(client);
  }

  async update(id: string, client: Client): Promise<Client> {
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

  async login(userName: string, password: string): Promise<any> {
    const client = await this.findBy('userName', userName);
    const isPasswordValid = await bcrypt.compare(password, client.password);
  
    if (!client || !isPasswordValid) {
      throw new Error('Invalid username or password');
    }
  
    const payload = { userName: client.userName, sub: client.id };
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
  }
}
