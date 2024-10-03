import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export default function generate (seed) {
  return uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals],
    separator: '-',
    style: 'capital',
    seed
  });
}
