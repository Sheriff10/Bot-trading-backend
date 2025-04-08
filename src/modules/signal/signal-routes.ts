import { Router } from 'express';
import { SignalController } from './signal-controller';

const signalRoute = Router();

signalRoute.get('/signals', SignalController.getAllSignals);

export default signalRoute;
