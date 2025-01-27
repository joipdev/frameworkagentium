import { Request, Response } from 'express';
import { updateAgent } from '../../repository/agent';
import { Agent } from '@prisma/client';

export const updateAgentController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const agentId = req.params.id;
    const updateData: Partial<Agent> = req.body;

    const updatedAgent = await updateAgent(agentId, updateData);

    if (!updatedAgent) {
      res.status(404).json({ error: 'Agent not found' });
      return;
    }

    res.status(200).json(updatedAgent);
  } catch (error) {
    console.error('Error updating agent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
