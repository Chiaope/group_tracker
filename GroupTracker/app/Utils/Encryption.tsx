import CryptoJS from 'crypto-js';

const encryptCompactData = (data: object, secretKey: string): string => {
  // 1. Stringify and minimize the JSON
  const jsonString = JSON.stringify(data); // Already compact for simple objects

  // 2. Encrypt with AES (128-bit for shorter output)
  const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey, {
    mode: CryptoJS.mode.ECB, // ECB doesn't use IV (shorter output)
    padding: CryptoJS.pad.Pkcs7
  });

  // 3. Convert to Base64URL for URL-safe compact output
  return encrypted.toString()
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const decryptCompactData = (encryptedString: string, secretKey: string): any => {
  // 1. Convert from Base64URL to standard Base64
  let base64 = encryptedString
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  // Add padding if needed
  while (base64.length % 4) {
    base64 += '=';
  }

  // 2. Decrypt
  const decrypted = CryptoJS.AES.decrypt(base64, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  // 3. Parse back to object
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

const generateInviteToken = (data: { groupId: number }, secret: string): string => {
  // Simple XOR "encryption" - not cryptographically secure!
  const num = data.groupId;
  const key = parseInt(CryptoJS.MD5(secret).toString().substring(0, 8), 16) || 0xDEADBEEF;
  const encryptedNum = (num ^ key).toString(36); // Base36 encoding
  return 's' + encryptedNum + 'c';
};

const decodeInviteToken = (code: string, secret: string): { groupId: number } => {
  const key = parseInt(CryptoJS.MD5(secret).toString().substring(0, 8), 16) || 0xDEADBEEF;
  code = code.substring(1, code.length-1)
  const num = parseInt(code, 36) ^ key;
  return { groupId: num };
};

export { encryptCompactData, decryptCompactData, generateInviteToken, decodeInviteToken }