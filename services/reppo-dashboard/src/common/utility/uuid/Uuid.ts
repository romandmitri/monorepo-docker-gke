import { v7 } from "uuid";

/** @deprecated TODO: reidenzon - Do NOT use directly, always extend! */
export type Uuid = string;

export const newUuid = (): Uuid => v7({});
