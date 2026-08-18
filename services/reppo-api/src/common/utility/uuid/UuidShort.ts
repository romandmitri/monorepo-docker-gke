import {newUuid} from "@/src/common/utility/uuid/Uuid.js";

/** @deprecated TODO: reidenzon - Do NOT use directly, always extend! */
export type UuidShort = string;

export const newUuidShort = (): UuidShort => newUuid().slice(-12);
