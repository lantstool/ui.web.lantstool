import { generateKey } from './generateKey.js';
import { onMountKeyGenerator } from './onMountKeyGenerator.js';
import { runAccountCleaner } from './runAccountCleaner/runAccountCleaner.js';

export const effects = {
  generateKey,
  onMountKeyGenerator,
  runAccountCleaner,
};
