import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import DecodedToken from 'src/DecodedToken';
import { Client } from 'src/models/Client/Client';
import {
  CLIENT_SERVICE,
  ClientService,
} from 'src/services/Client/ClientService';
import { MAIL_SERVICE } from 'src/services/MailService';
import { MailServiceImpl } from 'src/services/MailServiceImpl';

@Controller('clients')
export class ClientController {
  private readonly logger = new Logger(ClientController.name);

  constructor(
    @Inject(CLIENT_SERVICE)
    private readonly clientService: ClientService,
    @Inject(MAIL_SERVICE)
    private mailService: MailServiceImpl,
  ) {}

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
      return await this.clientService.getOne(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(
        error.message,
        error.message === 'Client not found'
          ? HttpStatus.NOT_FOUND
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('register')
  async register(@Body() client: Client): Promise<Client> {
    try {
      this.logger.log('Registering a new client');
      return await this.clientService.register(client);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(
    @Body() loginParams: { userName: string; password: string },
  ): Promise<any> {
    try {
      this.logger.log(`Logging in client: ${loginParams.userName}`);
      const token = await this.clientService.login(
        loginParams.userName,
        loginParams.password,
      );
      return { access_token: token };
    } catch (error) {
      this.logger.error('Invalid username or password');
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
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
      const resetPasswordUrl = `http://localhost:3002/reset-password?token=${token}`;
      const emailContent = `Hello ${client.userName},\n\nPlease click on the following link to reset your password: ${resetPasswordUrl}`;

      await this.mailService.sendMail(client.email, emailSubject, emailContent);

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

      console.log('here');

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

  @Get('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() params: { newPassword: string },
  ): Promise<void> {
    try {
      this.logger.log('Processing reset password request');

      const decodedToken = jwt.verify(token, 'secretKey') as DecodedToken;
      const clientId = decodedToken?.clientId;

      const client = await this.clientService.findBy('id', clientId);
      if (!client) {
        this.logger.error('Client not found');
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }

      const hashedPassword = await this.clientService.hashPassword(
        params.newPassword,
      );
      client.password = hashedPassword;

      const updatedClient = await this.clientService.update(clientId, client);
      if (!updatedClient) {
        this.logger.error('Failed to update client password');
        throw new HttpException(
          'Failed to update client password',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      this.logger.log('Password updated successfully');
    } catch (error) {
      this.logger.error(
        'Failed to process reset password request',
        error.stack,
      );
      throw new HttpException(
        'Failed to process reset password request',
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
