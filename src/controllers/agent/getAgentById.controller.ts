import { Request, Response } from 'express';
import { getAgentById } from '../../repository/agent';

export const getAgentByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const agent = await getAgentById(id);

    if (!agent) {
      res.status(404).json({ error: 'Agent not found' });
      return;
    }

    res.status(200).json(agent);
  } catch (error) {
    console.error('Error getting agent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
