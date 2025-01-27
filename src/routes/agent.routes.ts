import { Router } from 'express';
import { createAgentController } from '../controllers/agent/createAgent.controller';
import { getActiveAgentsByWalletController } from '../controllers/agent/getAgentsByWallet.controller';
import { updateAgentController } from '../controllers/agent/updateAgent.controller';
import { deployAgentController } from '../controllers/agent/deployAgent.controller';
import { getAgentByIdController } from '../controllers/agent/getAgentById.controller';
import { apiLimiter, deployLimiter } from '../middleware/rateLimiter';

export const agentRouter = Router();

// Apply general rate limiting to all agent routes
agentRouter.use(apiLimiter);

agentRouter.post('/', createAgentController);
agentRouter.get('/wallet/:wallet', getActiveAgentsByWalletController);
agentRouter.get('/:id', getAgentByIdController);
agentRouter.put('/:id', updateAgentController);

// Apply stricter rate limiting to deploy endpoint
agentRouter.post('/:id/deploy', deployLimiter, deployAgentController);
