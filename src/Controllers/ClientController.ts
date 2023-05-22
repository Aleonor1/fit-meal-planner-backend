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
  Res,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Client } from 'src/models/Client/Client';
import { ClientServiceImpl } from 'src/services/Client/ClientServiceImpl';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/MailService';
import { request } from 'express';
import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import DecodedToken from 'src/DecodedToken';

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
      const isPasswordValid = await bcrypt.compare(
        loginParams.password,
        client.password,
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
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() params: { userName: string }): Promise<void> {
    try {
      const userName = params.userName;

      this.logger.log(
        `Processing forgot password request for userName: ${userName}`,
      );

      const client = await this.clientService.findBy('userName', userName);
      if (!client) {
        this.logger.error('Client not found');
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }

      const token = jwt.sign({ clientId: client.id }, 'secretKey', {
        expiresIn: '1h',
      });

      const emailSubject = 'Password Reset';
      const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}`;
      const emailContent = `Hello ${client.userName},\n\nPlease click on the following link to reset your password: ${resetPasswordUrl}`;

      const mailService = MailService.getInstance();

      await mailService.sendMail(client.email, emailSubject, emailContent);

      this.logger.log('Password reset email sent successfully');
    } catch (error) {
      this.logger.error(
        'Failed to process forgot password request',
        error.stack,
      );
      throw new HttpException(
        'Failed to process forgot password request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/update-password')
  async updatePassword(
    @Param('id') id: string,
    @Body() passwordData: { newPassword: string },
    @Res() response: Response,
  ): Promise<void> {
    const newPassword = passwordData.newPassword;
    try {
      const client = await this.clientService.findOne(id);

      if (!client) {
        this.logger.error('Client not found');
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }

      const hashedPassword = await this.clientService.hashPassword(newPassword);
      client.password = hashedPassword;

      const updatedClient = await this.clientService.update(id, client);

      if (!updatedClient) {
        this.logger.error('Failed to update client password');
        throw new HttpException(
          'Failed to update client password',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      response
        .status(HttpStatus.OK)
        .json({ message: 'Password updated successfully' });
    } catch (error) {
      this.logger.error('Failed to update client password', error.stack);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update client password' });
    }
  }

  @Post('validate-token')
  async validateToken(
    @Body() body: { token: string },
    @Res() response: Response,
  ): Promise<void> {
    try {
      const { token } = body;

      const decodedToken = jwt.verify(token, 'secretKey') as DecodedToken;
      const clientId = decodedToken?.clientId;

      const client = await this.clientService.findBy('id', clientId);

      if (client) {
        response.status(HttpStatus.OK).json(client);
      } else {
        response.status(HttpStatus.BAD_REQUEST).json({ isValid: false });
      }
    } catch (exception) {
      response.status(HttpStatus.BAD_REQUEST).json({ isValid: false });
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
        throw new HttpException('Client no t found', HttpStatus.NOT_FOUND);
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
