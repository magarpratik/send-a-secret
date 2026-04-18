import { describe, expect, test } from '@jest/globals';
import { encrypt, decrypt, generateEncryptionKey } from '../../src/lib/crypto';

describe('crypto basic flow', () => {
	test('generates a 32-byte encryption key', () => {
		const key = generateEncryptionKey();
		expect(key.length).toBe(32);
	});

	test('encrypts and decrypts a message correctly', async () => {
		const key = generateEncryptionKey();
		const message = 'hello secret';

		const { ciphertext, iv } = await encrypt(message, key);
		const result = await decrypt(ciphertext, key, iv);

		expect(result).toBe(message);
	});

	test('handles empty string', async () => {
		const key = generateEncryptionKey();
		const message = '';

		const { ciphertext, iv } = await encrypt(message, key);
		const result = await decrypt(ciphertext, key, iv);

		expect(result).toBe('');
	});

	test('fails to decrypt with wrong key', async () => {
		const key = generateEncryptionKey();
		const wrongKey = generateEncryptionKey();
		const message = 'secret';

		const { ciphertext, iv } = await encrypt(message, key);

		await expect(decrypt(ciphertext, wrongKey, iv)).rejects.toThrow();
	});

	test('fails to decrypt when ciphertext is modified', async () => {
		const key = generateEncryptionKey();
		const message = 'secret';

		const { ciphertext, iv } = await encrypt(message, key);

		ciphertext[0] ^= 1;

		await expect(decrypt(ciphertext, key, iv)).rejects.toThrow();
	});

	test('same message produces different ciphertexts', async () => {
		const key = generateEncryptionKey();
		const message = 'hello';

		const first = await encrypt(message, key);
		const second = await encrypt(message, key);

		expect(first.ciphertext).not.toEqual(second.ciphertext);
	});
});
