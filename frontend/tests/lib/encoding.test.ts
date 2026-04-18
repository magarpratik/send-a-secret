import { fromBase64, toBase64 } from '../../src/lib/encoding';
import { describe, expect, test } from '@jest/globals';

describe('base64 utils', () => {
	test('encodes and decodes correctly', () => {
		const original = new Uint8Array([1, 2, 3, 255, 0, 100]);

		const encoded = toBase64(original);
		const decoded = fromBase64(encoded);

		expect(decoded).toEqual(original);
	});

	test('handles empty Uint8Array', () => {
		const original = new Uint8Array([]);

		const encoded = toBase64(original);
		const decoded = fromBase64(encoded);

		expect(decoded).toEqual(original);
	});

	test('encodes and decodes random bytes correctly', () => {
		const original = crypto.getRandomValues(new Uint8Array(64));

		const encoded = toBase64(original);
		const decoded = fromBase64(encoded);

		expect(decoded).toEqual(original);
	});

	test('produces url-safe base64 (no + / =)', () => {
		const original = new Uint8Array([1, 2, 3, 4, 5]);

		const encoded = toBase64(original);

		expect(encoded).not.toMatch(/[+/=]/);
	});
});
