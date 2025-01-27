import { Request, Response } from 'express';
import { TwitterApi } from 'twitter-api-v2';
import { prismaClient } from '../../prisma/client';
import { twitterSessions } from '../..';

export const callbackController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { oauth_token, oauth_verifier } = req.query;

    const session = twitterSessions.get(oauth_token as string);

    if (!session) {
      res.sendStatus(400);
      return;
    }

    const { oauthSecret, agentId } = session;

    if (!oauth_token || !oauth_verifier || !oauthSecret) {
      res.sendStatus(400);
      return;
    }

    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY as string,
      appSecret: process.env.TWITTER_API_SECRET as string,
      accessToken: oauth_token as string,
      accessSecret: oauthSecret as string,
    });

    const { accessToken, accessSecret } = await client.login(
      oauth_verifier as string,
    );

    await prismaClient.agent.update({
      where: {
        id: agentId,
      },
      data: {
        twitterAccessToken: accessToken,
        twitterAccessSecret: accessSecret,
      },
    });

    res.redirect(`${process.env.FRONTEND_URL}/create?agentId=${agentId}`);
    return;
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
};
