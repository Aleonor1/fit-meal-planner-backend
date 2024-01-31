import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from 'src/Controllers/ClientController';
import { Client } from 'src/models/Client/Client';
import { CLIENT_REPOSITORY } from 'src/repositories/ClientRepository';
import { ClientRepositoryImpl } from 'src/repositories/ClientRepositoryImpl';
import { CLIENT_SERVICE } from 'src/services/Client/ClientService';
import { ClientServiceImpl } from 'src/services/Client/ClientServiceImpl';
import { MAIL_SERVICE } from 'src/services/MailService';
import { MailServiceImpl } from 'src/services/MailServiceImpl';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [
    { useClass: ClientRepositoryImpl, provide: CLIENT_REPOSITORY },
    { useClass: ClientServiceImpl, provide: CLIENT_SERVICE },
    { useClass: MailServiceImpl, provide: MAIL_SERVICE },
  ],
  controllers: [ClientController],
})
export class ClientModule {}
