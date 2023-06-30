const crypto = require('crypto');
const { log, } = require('console');

const data = "password";

// creating hash object
const hashAlgo = crypto.createHash('sha256')

// passing the data to be hashed
hashAlgo.update(data);

// Creating the hash in the required format
const hash = hashAlgo.digest('hex');

log(`Hash: ${hash}`);

// create random bytes
const randomBytes = crypto.randomBytes(32);

// convert to hex
const randomString = randomBytes.toString("hex");

log('Random string: '+randomString); //logs random string to the console

// Generate a secret key for encryption and decryption.
const secretKey = crypto.randomBytes(32);

// Generate an initialization vector
const iv = crypto.randomBytes(16);

// data to be encrypted
const plainText = "This is a secret message";

// create cipher object
const cipher = crypto.createCipheriv(
  "aes-256-cbc",
  secretKey,
  iv,
);

// encrypt the data
let encryptedText = cipher.update(
  plainText,
  "utf-8",
  "hex",
);

// finalize the encryption
encryptedText += cipher.final("hex");

log('Encrypt \''+plainText+'\': '+encryptedText);

// create Decipher object
const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);

// decrypt the data
let decryptedText = decipher.update(encryptedText, "hex", "utf-8");

// finalize the decryption
decryptedText += decipher.final("utf-8");

log('Decrypt \''+encryptedText+'\': '+decryptedText); // This is a secret message
