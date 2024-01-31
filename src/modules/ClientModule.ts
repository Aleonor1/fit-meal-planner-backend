import { ClientController } from 'src/Controllers/ClientController';
import { Client } from 'src/models/Client/Client';
import { ClientRepositoryImpl } from 'src/repositories/ClientRepositoryImpl';
import { ClientServiceImpl } from 'src/services/Client/ClientServiceImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MailService } from 'src/MailService';
import Mail from 'nodemailer/lib/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientServiceImpl, ClientRepositoryImpl, MailService],
  controllers: [ClientController],
})
export class ClientModule {}
