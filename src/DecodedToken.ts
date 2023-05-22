import { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  clientId: string;
}

export default DecodedToken;
