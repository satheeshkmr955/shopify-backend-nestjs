export function maskSensitive<T extends Record<string, any>>(
  obj: T | undefined | null,
  sensitiveKeys: string[] = [
    'password',
    'token',
    'secret',
    'cookie',
    'firstName',
    'lastName',
    // 'email',
  ],
): T | undefined | null {
  if (!obj) return obj;

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      sensitiveKeys = sensitiveKeys.map((key) => key.toLowerCase());
      if (sensitiveKeys.includes(key.toLowerCase())) {
        return [key, '***MASKED***'];
      }
      if (typeof value === 'object' && value !== null) {
        return [
          key,
          maskSensitive(value as Record<string, any>, sensitiveKeys),
        ];
      }
      return [key, value];
    }),
  ) as T;
}
