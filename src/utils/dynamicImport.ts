export const dynamicImport = async <T>(
  packageName: string,
): Promise<{
  default: T;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-implied-eval, @typescript-eslint/no-unsafe-call
}> => await new Function(`return import('${packageName}')`)();
