import { describe, expect, test, beforeEach } from '@jest/globals';
import { encrypt, decrypt, generateEncryptionKey } from '../../src/lib/crypto';
import { toBase64, fromBase64 } from '../../src/lib/encoding';
import { storeSecretMock, getSecretMock, resetStore } from '../mocks/mock';

describe('secret lifecycle', () => {
	beforeEach(() => {
		resetStore();
	});

	test('full encrypt → store → retrieve → decrypt flow', async () => {
		const message = 'my secret message';
		const key = generateEncryptionKey();

		// encrypt
		const { ciphertext, iv } = await encrypt(message, key);
		const encodedKey = toBase64(key);

		// store
		const { data } = storeSecretMock({
			ciphertext: toBase64(ciphertext),
			iv: toBase64(iv)
		});

		// retrieve
		const result = getSecretMock({ secretId: data.secretId });

		// decode
		const keyBytes = fromBase64(encodedKey);
		const ivBytes = fromBase64(result.data.iv);
		const cipherBytes = fromBase64(result.data.ciphertext);

		// decrypt
		const decrypted = await decrypt(cipherBytes, keyBytes, ivBytes);

		expect(decrypted).toBe(message);
	});
});
