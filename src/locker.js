import pify from 'pify';
import Gun from 'gun/gun';
import SEA from 'gun/sea.js';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';
import 'gun/lib/webrtc';

import generateAlias from './alias';

// master passphrase to unlock the locker
// link: http://passlockr.com/?l=cool-purple-penguin
export async function createMaster (passphrase, customAlias = null) {
  const g = initialize();
  const user = g.user();
  const alias = customAlias || generateAlias(passphrase); // red-slow-zebra
  console.log(alias);
  // check if alias exists  
  g.get(`~@${alias}`, async (ack) => {
    if (!ack.put) {
      user.create(alias, passphrase, (r) => {
        console.log('not found, creating');
        console.log(r);
        return new Promise((resolve, reject) => {
          if (r.err) {
            reject();
          }
          resolve(r);
        });
      });
    }
    return await unlock(alias, passphrase);
  });
}

export async function unlock (knownAlias, passphrase) {
  const g = initialize();
  const user = g.user();
  // authenticate
  user.auth(knownAlias, passphrase, (u) => {
    console.log('found');
    console.log(user.is);
    return new Promise((resolve, reject) => {
      if (u.err) {
        reject();
      }
      resolve();
    });
  });
}

function initialize (relays = []) {
  return Gun({ /*peers: relays,*/ localStorage: false });
}
