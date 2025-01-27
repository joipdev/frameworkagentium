import axios from 'axios';

export const generateCompletion = async (content: string) =>
  axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'meta-llama/llama-3.1-70b-instruct:free',
      messages: [{ role: 'system', content }, {role: "user", content: "Generate a random tweet with a thought, a joke or anything you feel like, based on your personality."}],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
      },
    },
  );
