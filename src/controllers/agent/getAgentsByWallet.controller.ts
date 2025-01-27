import { Request, Response } from 'express';
import { getActiveAgentsByWallet } from '../../repository/agent';

export const getActiveAgentsByWalletController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { wallet } = req.params;
    const agents = await getActiveAgentsByWallet(wallet);
    res.json(agents);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
