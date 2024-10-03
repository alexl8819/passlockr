import basex from 'base-x';

export const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function extendedBase62 (charset) {
  return basex(charset);
}
/*
const BASE74 = basex(BASE62 + '!@#$%^&*()-+');

const encoded = BASE74.encode(Buffer.from('This is a test value', 'utf8'));
console.log(encoded);

const decoded = BASE74.decode(encoded);
console.log(Buffer.from(decoded).toString('utf8'));*/
