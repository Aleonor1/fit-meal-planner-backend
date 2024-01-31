import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  CLIENT_SERVICE,
  ClientService,
} from 'src/services/Client/ClientService';
import * as jwt from 'jsonwebtoken';
import DecodedToken from 'src/DecodedToken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(CLIENT_SERVICE)
    private readonly clientService: ClientService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    console.log('auth middleware');

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decodedToken = jwt.verify(token, 'secretKey') as DecodedToken;
      const clientId = decodedToken?.sub;

      const client = await this.clientService.findOne(clientId);

      if (!client) {
        throw new UnauthorizedException('Invalid token');
      }

      next();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
