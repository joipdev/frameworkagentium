import { Request, Response } from 'express';
import { createAgent } from '../../repository/agent';

export const createAgentController = async (req: Request, res: Response) => {
  try {
    const {
      id,
      creatorWallet,
      contractAddress,
      name,
      description,
      catchPhrases,
      personality,
      activities,
      basicDescription,
      terms,
      tweetFrequency,
    } = req.body;

    await createAgent({
      id,
      creatorWallet,
      contractAddress,
      name,
      description,
      catchPhrases,
      personality,
      activities,
      basicDescription,
      terms,
      tweetFrequency,
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
