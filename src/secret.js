import { argon2id, argon2Verify, createSHA256 } from 'hash-wasm';
import random from 'random';
import crypto from 'node:crypto';

import { BASE62, extendedBase62 } from './encoding.js';

export async function deriveKeyFromContext (master, context) {

}

async function deriveKey (pass, salt) {
  const password = pass.normalize();
  const key = await argon2id({
    password,
    salt, // salt is a buffer containing random bytes
    parallelism: 1,
    iterations: 256,
    memorySize: 512, // use 512KB memory
    hashLength: 32, // output size = 32 bytes
    outputType: 'hex', // return standard encoded string containing parameters needed to verify the key
  });

  console.log('Derived key:', key);
  /*
  const isValid = await argon2Verify({
    password,
    hash: key,
  });

  console.log(isValid ? 'Valid password' : 'Invalid password');
  */
  return key;
}

async function deriveSaltFromRandom () {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  // window.crypto.webcrypto.getRandomValues(salt);
  return salt;
}

async function deriveSaltFromContext (context) {
  const shaHash = await createSHA256();
  shaHash.init();
  shaHash.update(context);
  const salt = shaHash.digest();
  return salt;
}

function randomChar (str) {
  return str.charAt(random.int(0, str.length))
}

/*
const salt = await deriveSaltFromContext('(example.com:fakeusername@email.com)/0');
console.log('derived salt: ' + salt);
const key = await deriveKey('(example.com:fakeusername@email.com)/0:This Is My Password 19374789!!44', salt);

const charset = BASE62 + '!@#$%^&*()-+';
const customEncoding = extendedBase62(charset);

const len = 14;
const encodedKey = customEncoding.encode(Buffer.from(key, 'hex')).toString('utf8');
console.log(encodedKey);
let fk = '';

for (let i = 0; i < len; i++) {
  fk += randomChar(charset);
}
console.log(fk);

for (let j = 0; j < Math.min(len, encodedKey.length); j++) {
  fk = fk.substring(0, j) + encodedKey[j] + fk.substring(j + 1);
}

console.log(fk);*/
