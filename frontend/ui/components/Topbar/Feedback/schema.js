import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
const discordRegex = /^[^#]{2,32}#\d{4}$|^(?!.*\.\.|[A-Z])[a-z\d_.]{2,32}$/;

const contactInfoRules = {
  Email: {
    regex: emailRegex,
    message: 'Please enter a valid email address',
  },
  Telegram: {
    regex: telegramRegex,
    message: 'Please enter a valid Telegram username',
  },
  Discord: {
    regex: discordRegex,
    message: 'Please enter a valid Discord username',
  },
};

export const schema = z
  .object({
    name: z.string().max(100, 'Name must be at most 100 characters').optional(),

    contactMethod: z.object({
      value: z.string().nonempty('Contact method is required'),
    }),

    contactInfo: z
      .string()
      .trim()
      .min(1, 'Contact info is required')
      .max(100, 'Contact info must be at most 100 characters'),

    feedbackType: z.object({
      value: z.string().nonempty('Feedback type is required'),
    }),

    message: z
      .string()
      .trim()
      .nonempty('Message is required')
      .min(2, 'Message must be at least 2 characters')
      .max(1000, 'Message must be at most 1000 characters'),
  })
  .superRefine((data, context) => {
    const methodRaw = data.contactMethod.value;
    const value = data.contactInfo;

    if (!value) return;

    const rule = contactInfoRules[methodRaw];
    if (!rule) return;

    if (!rule.regex.test(value)) {
      context.addIssue({
        code: 'custom',
        path: ['contactInfo'],
        message: rule.message,
      });
    }
  });
