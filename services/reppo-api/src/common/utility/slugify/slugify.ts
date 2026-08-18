import slugifyModule from "slugify";

type SlugifyFn = (str: string, options?: { lower?: boolean; strict?: boolean; remove?: RegExp }) => string;
export const slugify: SlugifyFn = (slugifyModule as unknown as { default: SlugifyFn }).default ?? slugifyModule;
