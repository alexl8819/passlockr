# passlockr
Portable password manager - Load from any device, anywhere. 

## Concept
- Creates a unique user "vault" (identified by a three-word alias: no identifiable information is revealed) using PBKDF2 from a 13+ character master password or passphrase which is distributed across a graph and can be accessed globally. This ensures no data is centralized or vulnerable to server-side exploitation.
- Saves and encrypts individual secret context to this user using a seperate derived key (argonid2) from the same master password or passphrase combined with specific user context, which is encrypted using AES-GCM. This ensures if the master password is revealed for any reason, there is an added layer of security as context would also need to be known for each individual secret created.
- Secrets derived can be configured to use specific character sets and various lengths if necessary 
- Recovery possible with a BIP39 seed phrase generated at user "vault" creation using master password as a seed

Convenience comes at the cost of some security; context-derived salts _are generally less secure_ than random salt generation. However as long as context details are not leaked or entirely guessable AND you have access to your device, these secrets should be reasonably secure.

## Example Flow
User wants to save their login for a website

New user vault:
--------------
1a. Alias is automatically generated (red-angry-mongoose): access using https://passlockr.co/red-angry-mongoose
- If collision occurs, a different alias is generated until valid
- Vulnerable to a spam attack - someone could just mass create accounts - potential flaw in underlying protocol (GUN) 
1b. User is prompted to create a master password (recommended: 13 character minimum)

Existing user vault:
--------------------
1c. User is prompted to enter their master password

Device link (optional but more secure)
-----------
2. User is prompted to link their trusted mobile device by QR code or manually copying a link (mobile device)
- An identifier is derived from browser-specific environmental details on a trusted device connected for the current session and is used as a salt to derive an encryption key to encrypt/decrypt user-specific details.
- Experimental method and subject to change, preferably to Webauthn in the future (https://caniuse.com/?search=webauthn)

Create a new password entry
--------------------------
3a. User enters a new url and email/username, a new password is generated from configured options (custom length, custom characters)
- Context-specific details combined with the identifier generated earlier derives password
- New passwords can be rotated by automatic increment when requesting a new password (i.e button says "rotate")
- ex: master password + user specific details + identifier (if supplied) + rotations = password
- Passwords are never saved, only derived

User wants to retrieve their password(s)
---------------------------------------
3b. All user-context metadata derived from identifier are unlocked and viewable

Two requirements: user must know master password (something you know), user must have a device to unlock context (something you have)

## Status
Experimental - this is a Proof of Concept and not meant to be used in production until proven secure
