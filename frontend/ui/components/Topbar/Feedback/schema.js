import * as z from 'zod/mini';

const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
const discordRegex = /^[^#]{2,32}#\d{4}$|^(?!.*\.\.|[A-Z])[a-z\d_.]{2,32}$/;

const contactInfoRules = {
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
    name: z.string().check(z.maxLength(100, { message: 'Name must be at most 100 characters.' })),
    contactMethod: z.object({
      value: z.string(),
    }),

    contactInfo: z.string().check(z.trim()),

    feedbackType: z.object({
      value: z.string(),
    }),

    message: z
      .string()
      .check(
        z.trim(),
        z.minLength(1, { message: 'Message is required.' }),
        z.minLength(2, { message: 'Message must be at least 2 characters.' }),
        z.maxLength(1000, { message: 'Message must be at most 1000 characters.' }),
      ),
  })
  .check(
    z.superRefine((data, context) => {
      const methodRaw = data?.contactMethod?.value;
      const value = data?.contactInfo;

      if (!value) {
        context.addIssue({
          code: 'custom',
          path: ['contactInfo'],
          message: `${methodRaw} is required`,
        });
        return;
      }
      if (value.length > 100) {
        context.addIssue({
          code: 'custom',
          path: ['contactInfo'],
          message: `${methodRaw} must be at most 100 characters`,
        });
        return;
      }

      if (methodRaw === 'Email' && !z.string().check(z.email()).safeParse(value).success) {
        context.addIssue({
          code: 'custom',
          path: ['contactInfo'],
          message: 'Please enter a valid Email address',
        });
        return;
      }

      const rule = contactInfoRules[methodRaw];
      if (!rule) return;

      if (!rule.regex.test(value)) {
        context.addIssue({
          code: 'custom',
          path: ['contactInfo'],
          message: rule.message,
        });
      }
    }),
  );
