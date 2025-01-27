import { Router } from 'express';
import { callbackController } from '../controllers/twitter/callback.controller';
import { authController } from '../controllers/twitter/auth.controller';

export const twitterRouter = Router();

twitterRouter.get('/auth', authController);

twitterRouter.get('/callback', callbackController);
