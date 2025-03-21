import { UAParser } from 'ua-parser-js';
import { Crawlers, Bots , InApps} from 'ua-parser-js/extensions';
import { isBot, isAIBot } from 'ua-parser-js/helpers';

const uap = new UAParser([Crawlers, Bots, InApps]);

export const parseUserAgent = async () => {
  const result = await uap.getResult().withClientHints();

  const res = uap.getResult();
  result.isBot = isBot(res);
  result.isAiBot = isAIBot(res);

  return result;
}
