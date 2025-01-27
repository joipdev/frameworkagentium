import { Request, Response } from 'express';
import { twitterClient } from '../../services/twitter/twitter';
import { twitterSessions } from '../..';

export const authController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { agentId } = req.query;

    if (!agentId) {
      res.sendStatus(400);
      return;
    }

    const authLink = await twitterClient.generateAuthLink(
      `${process.env.BACKEND_URL}/twitter/callback`,
      {
        linkMode: 'authorize',
      },
    );

    twitterSessions.set(authLink.oauth_token, {
      oauthSecret: authLink.oauth_token_secret,
      agentId: agentId as string,
    });

    res.status(200).json({ authLink });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
