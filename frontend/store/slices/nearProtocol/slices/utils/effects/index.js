import { generateKey } from './generateKey.js';
import { onMountKeyGenerator } from './onMountKeyGenerator.js';
import { onMountAccountCleaner } from './onMountAccountCleaner.js';
import { runAccountCleaner } from './runAccountCleaner/runAccountCleaner.js';

export const effects = {
  generateKey,
  onMountKeyGenerator,
  onMountAccountCleaner,
  runAccountCleaner,
};
