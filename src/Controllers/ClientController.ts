import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Client } from 'src/models/Client/Client';
import { ClientServiceImpl } from 'src/services/Client/ClientServiceImpl';
import * as bcrypt from 'bcrypt';

@Controller('clients')
export class ClientController {
  private readonly logger = new Logger(ClientController.name);

  constructor(private readonly clientService: ClientServiceImpl) {}

  @Get()
  async getAll(): Promise<Client[]> {
    try {
      this.logger.log('Getting all clients');
      return await this.clientService.findAll();
    } catch (error) {
      this.logger.error('Failed to retrieve clients', error.stack);
      throw new HttpException(
        'Failed to retrieve clients',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Client> {
    try {
      this.logger.log(`Getting client with ID: ${id}`);
      const client = await this.clientService.findOne(id);
      if (!client) {
        this.logger.error('Client not found');
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }
      return client;
    } catch (error) {
      this.logger.error('Failed to retrieve client', error.stack);
      throw new HttpException(
        'Failed to retrieve client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('register')
  async register(@Body() client: Client): Promise<Client> {
    try {
      this.logger.log('Registering a new client');
      const newClient = await this.clientService.create(client);
      delete newClient.password;
      return newClient;
    } catch (error) {
      this.logger.error('Failed to register client', error.stack);
      throw new HttpException(
        'Failed to register client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(
    @Body() loginParams: { userName: string; password: string },
  ): Promise<any> {
    try {
      this.logger.log(`Logging in client: ${loginParams.userName}`);
      const client = await this.clientService.findBy(
        'userName',
        loginParams.userName,
      );
      const hashedPassword = await this.clientService.hashPassword(
        loginParams.password,
      );
      const isPasswordValid = await bcrypt.compare(
        loginParams.password,
        hashedPassword,
      );
      if (!client || !isPasswordValid) {
        this.logger.error('Invalid username or password');
        throw new HttpException(
          'Invalid username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const payload = { userName: client.userName, sub: client.id };
      return {
        access_token: jwt.sign(payload, 'secretKey', { expiresIn: '1h' }),
      };
    } catch (error) {
      this.logger.error('Failed to login', error.stack);
      throw new HttpException(
        'Failed to login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() client: Client,
  ): Promise<Client> {
    try {
      this.logger.log(`Updating client with ID: ${id}`);
      const updatedClient = await this.clientService.update(id, client);
      if (!updatedClient) {
        this.logger.error('Client not found');
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }
      return updatedClient;
    } catch (error) {
      this.logger.error('Failed to update client', error.stack);
      throw new HttpException(
        'Failed to update client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.logger.log(`Removing client with ID: ${id}`);
      const client = await this.clientService.findOne(id);
      if (!client) {
        this.logger.error('Client not found');
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }
      await this.clientService.remove(id);
    } catch (error) {
      this.logger.error('Failed to remove client', error.stack);
      throw new HttpException(
        'Failed to remove client',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
