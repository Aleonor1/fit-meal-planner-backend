import { ClientController } from 'src/Controllers/ClientController';
import { Client } from 'src/models/Client/Client';
import { ClientRepositoryImpl } from 'src/repositories/ClientRepositoryImpl';
import { ClientServiceImpl } from 'src/services/Client/ClientServiceImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientServiceImpl, ClientRepositoryImpl],
  controllers: [ClientController],
})
export class ClientModule {}
