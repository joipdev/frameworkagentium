import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { agentRouter } from './routes/agent.routes';
import { generateCompletion } from './LLM/generateCompletion';
import { LLMParser, Term } from './LLM/LLMParser';
import { prismaClient } from './prisma/client';
import { twitterRouter } from './routes/twitter.routes';
import { apiLimiter } from './middleware/rateLimiter';

dotenv.config();

const PORT = process.env.PORT || 3000;

export const twitterSessions = new Map<
  string,
  {
    oauthSecret: string;
    agentId: string;
  }
>();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.sendStatus(200);
});

app.use('/agent', agentRouter);
app.use('/twitter', twitterRouter);

app.get('/test-llm', async (req, res) => {
  try {
    const [agent] = await prismaClient.agent.findMany();

    const { data: response } = await generateCompletion(
      LLMParser.generateImageSystemPrompt({
        name: agent.name,
        activities: agent.activities,
        agentInImageDescription: agent.description,
        basicDescription: agent.basicDescription,
        catchPhrases: agent.catchPhrases,
        personality: agent.personality,
      }),
    );

    console.log(response.choices[0].message);

    const { data: response2 } = await generateCompletion(
      LLMParser.generateModelSystemPrompt({
        name: agent.name,
        activities: agent.activities,
        basicDescription: agent.basicDescription,
        catchPhrases: agent.catchPhrases,
        personality: agent.personality,
        terms: agent.terms as Term[],
      }),
    );

    console.log(response2.choices[0].message);

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Apply rate limiting to all routes
app.use(apiLimiter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
