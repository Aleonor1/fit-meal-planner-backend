import { Client } from '../models/Client/Client';
import { Repository } from 'typeorm';
import { ClientRepository } from './ClientRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CLIENT_PROPERTIES } from '../models/Client/ClientProperties';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) { }

  async find(): Promise<Client[]> {
    return this.clientRepository.createQueryBuilder('client').getMany();
  }

  async findByUsername(username: string): Promise<Client> {
    return this.clientRepository
      .createQueryBuilder('client')
      .where('client.username = :username', {
        username,
      })
      .getOne();
  }

  async findBy(property: keyof Client, value: string): Promise<Client> {
    return await this.clientRepository
      .createQueryBuilder('client')
      .where(`client.${property} = :value`, { value })
      .getOne();
  }

  async createClient(clientData: Client): Promise<Client> {
    const client = await this.clientRepository.save(clientData);
    return client;
  }

  async updateClient(
    id: string,
    clientData: Partial<Client>,
  ): Promise<Client | undefined> {
    const client = await this.findBy(CLIENT_PROPERTIES.id, id);
    if (!client) {
      return undefined;
    }
    Object.assign(client, clientData);
    return this.clientRepository.save(client);
  }

  async deleteClient(id: string): Promise<boolean> {
    const result = await this.clientRepository.delete(id);
    return result.affected > 0;
  }
}
