import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const key = Buffer.from(process.env.MASTER_KMS_KEY || 'troque-esta-chave-super-secreta', 'utf8').subarray(0, 32);

export function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, key);
  cipher.setAutoPadding(true);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}

export function decrypt(encryptedData) {
  const { encrypted, iv, authTag } = encryptedData;
  
  const decipher = crypto.createDecipher(algorithm, key);
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Simple encryption for password storage (JSON format)
export function encryptPassword(password) {
  const result = encrypt(password);
  return JSON.stringify(result);
}

export function decryptPassword(encryptedPassword) {
  try {
    const data = JSON.parse(encryptedPassword);
    return decrypt(data);
  } catch (error) {
    // Fallback for non-encrypted passwords during migration
    return encryptedPassword;
  }
}