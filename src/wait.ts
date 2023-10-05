import { setTimeout } from 'timers/promises';

// Just aliasing to avoid misusing setTimeout between ES method and timers/promises version.
export const wait = setTimeout;
