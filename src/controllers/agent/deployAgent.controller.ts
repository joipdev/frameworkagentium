import { Request, Response } from 'express';
import { prismaClient } from '../../prisma/client';

export const deployAgentController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const agentId = req.params.id;

    const updatedAgent = await prismaClient.agent.update({
      where: {
        id: agentId,
      },
      data: {
        active: true,
      },
    });

    if (!updatedAgent) {
      res.status(404).json({ error: 'Agent not found' });
      return;
    }

    res.status(200).json(updatedAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to deploy agent' });
  }
};
