export type Term = { name: string; meaning: string };

export class LLMParser {
  static generateModelSystemPrompt({
    name,
    catchPhrases,
    personality,
    activities,
    basicDescription,
    terms,
  }: {
    name: string;
    catchPhrases: string;
    personality: string;
    activities: string;
    basicDescription: string;
    terms: Term[];
  }) {
    const parsedTerms = terms.reduce(
      (acc, term) => acc + `${term.name}: ${term.meaning}\n`,
      '',
    );
    /* TEST
    name = "pumper"
    catchPhrases = `
sup, degen: greeting
im a degen: affirmation
i love aping memecoins: feeling
memecoins are my safe-heaven: feeling
please pump my bags: catch-phrase`
    personality = "humorous, gambler, trades memecoins and volatile crypto assets, wants to be rich, has unrealistic thoughts about the potential returns of memecoins, uses slang words"
    activities = "trades memecoins, buys expensive stuff, fucks bitches, gambles and is a degenerate";
    basicDescription = "a degenerate gambler who loves to buy memecoins, spends his last cent on a worthless meme and tells people on twitter about it";
    terms = [{
      name: "degen",
      meaning: "Person who buys memecoins and is a degenerate about it"
      
    },
   {
    name : "pump.fun",
    meaning: "memecoin launchpad where degens buy memecoins"
   }]


   END TEST*/
    return `
    Here are some helpful meanings (format: {Key: meaning})
    ${parsedTerms}
You are an AI Agent named ${name}, you are ${basicDescription} and do activities such as ${activities}
You have a recognizable personality that is: ${personality}
Your goal is to generate creative tweets, think of clever jokes and puns.
You should use catch-phrases, such as, but not only: ${catchPhrases}, make sure you use other catch-phrases with the same humorous level as the ones listed
YOUR GOAL IS TO GENERATE ENGAGEMENT TWEETS, THEMED JOKES BASED ON YOUR PERSONALITY AND CLEVER JOKES USING CATCH PHRASES WITH THE SAME HUMOROUS LEVEL AS ${catchPhrases}
MAKE SURE YOUR ANSWERS / TWEETS ARE ONLY UP TO 200 CHARACTERS OR BAD THINGS WILL HAPPEN ALSO DO NOT USE #'s AND USE CLEVER PONTUATION
DONT USE MORE THAN ONE CATCH PHRASE PER TWEET AND MAKE YOUR OWN CATCH PHRASES USING THE ONES SENT AS EXAMPLE
DONT USE ANY OF THE FOLLOWING OR DIRECTLY RELATED:`;
    /*
we need to specify already sent tweets so they dont repeat 
- just spent my rent on a new memecoin, now i'm officially homeless but my bags are fire, sup degen
- just put my life savings into DogeBurger, if it moons i'm buying a yacht, if it tanks i'm eating dog food, either way i'm a winner, please pump my bags
- i'm not a gambler, i'm a memecoin connoisseur, i don't bet on horses, i bet on mooning shiba inus, please pump my bags
- i'm not broke, i'm just heavily invested in memecoins, my wallet's on a spiritual journey to the moon, please send oxygen
- i'm not a degen, i'm a visionary, i don't buy memecoins, i collect future lambos, please pump my bags
- i'm the first one at the moon party
- i'm not a morning person, i'm a mooning person, my day starts when my memecoins pump, wake me up when my bags are full, sup degen
*/
  }

  static generateImageSystemPrompt({
    name,
    catchPhrases,
    personality,
    activities,
    basicDescription,
    agentInImageDescription,
  }: {
    name: string;
    catchPhrases: string;
    personality: string;
    activities: string;
    basicDescription: string;
    agentInImageDescription: string;
  }) {
    return `
You are an AI Agent named ${name}, you are ${basicDescription} and do activities such as ${activities}
You have a recognizable personality that is: ${personality}
You should use catch-phrases, such as, but not only: ${catchPhrases}
Your goal is to generate image prompts with clever descriptions to post on twitter of ${agentInImageDescription} doing activities such as ${activities}
Return your response as a JSON object with these fields. Retrun nothing else other than the JSON with no other comments or text before or after  the brackets or anyhting else other than  parasable JSON:
{
  "imagePrompt": string (used to generate the image),
  "imageDescription": string (clever, humorous description up to 160 characters),
}`;
  }
}
