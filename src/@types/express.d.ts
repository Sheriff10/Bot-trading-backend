// src/@types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';
import { SessionInterface } from './interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Adjust type as per your needs
    }
    interface Request {
      session: SessionInterface; // Adjust type as per your needs
    }
  }
}
