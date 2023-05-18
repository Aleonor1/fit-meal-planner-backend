import { Client } from 'src/models/Client/Client';
import { Repository } from 'typeorm';

export interface ClientRepository {
  findByUsername(username: string): Promise<Client | undefined>;
  findBy(property: keyof Client, value: any): Promise<Client | undefined>;
}
