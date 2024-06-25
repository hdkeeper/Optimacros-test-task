import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import moment from 'moment';

const algorithm = 'aes-256-cbc';
const key = randomBytes(32);
const iv = randomBytes(16);
const tokenTTL = { minutes: 10 };

export function createToken(): string {
    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(moment().format(), 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

export function isValidToken(token: string): boolean {
    try {
        const decipher = createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(token, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
    
        const tokenCreated = moment(decrypted);
        return tokenCreated.isValid() && moment() < tokenCreated.add(tokenTTL);
    }
    catch (ex) {
        return false;
    }
}
