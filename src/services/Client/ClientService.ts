import { Injectable } from '@nestjs/common';
import { Client } from 'src/models/Client/Client';

export interface ClientService {
  findAll(): Promise<Client[]>;
  findOne(id: string): Promise<Client>;
  remove(id: string): Promise<void>;
  create(client: Client): Promise<Client>;
  update(id: string, client: Client): Promise<Client>;
  validatePassword(id: string, password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}
