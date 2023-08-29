export function singleton<T>(key: string, init: () => T): T {
  const g = global as any;

  g.__singletons ??= {};

  if (g.__singletons[key] === undefined) {
    g.__singletons[key] = init();
  }

  return g.__singletons[key];
}
