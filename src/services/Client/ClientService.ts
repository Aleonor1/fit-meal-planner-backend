import { Injectable } from '@nestjs/common';
import { Client } from 'src/models/Client/Client';

export const CLIENT_SERVICE =
  "CLIENT_SERVICE";

export interface ClientService {
  findAll(): Promise<Client[]>;
  findOne(id: string): Promise<Client>;
  remove(id: string): Promise<void>;
  create(client: Client): Promise<Client>;
  update(id: string, client: Client): Promise<Client>;
  validatePassword(id: string, password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  getOne(id: string): Promise<Client>;
  login(userName: string, password: string): Promise<any>;
  register(client: Client): Promise<Client>;
  findBy(property: keyof Client, value: string): Promise<Client>;
  forgotPassword(userName: string): Promise<void>;
  updatePassword(id: string, newPassword: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  patch(id: string, partialClient: Partial<Client>): Promise<Client>;


}
