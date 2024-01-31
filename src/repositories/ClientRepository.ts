import { Client } from 'src/models/Client/Client';
import { Repository } from 'typeorm';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepository {
  findByUsername(username: string): Promise<Client | undefined>;
  findBy(property: keyof Client, value: any): Promise<Client | undefined>;
}
