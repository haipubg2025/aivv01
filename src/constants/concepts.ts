import { SFW_CONCEPTS } from './concepts_sfw';
import { NSFW_CONCEPTS } from './concepts_nsfw';

export const ALL_CONCEPTS = [
  ...SFW_CONCEPTS.map(c => ({ ...c, isNsfw: false })),
  ...NSFW_CONCEPTS.map(c => ({ ...c, isNsfw: true }))
];

export const SFW_ONLY = SFW_CONCEPTS;
export const NSFW_ONLY = NSFW_CONCEPTS;
