export function generateEncryptionKey() {
	return crypto.getRandomValues(new Uint8Array(32));
}

export async function encrypt(secret: string, keyBytes: BufferSource) {
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, [
		'encrypt'
	]);

	const encoded = new TextEncoder().encode(secret);
	const ciphertextBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

	return {
		ciphertext: new Uint8Array(ciphertextBuffer),
		iv
	};
}

export async function decrypt(
	ciphertext: Uint8Array<ArrayBuffer>,
	keyBytes: BufferSource,
	iv: Uint8Array<ArrayBuffer>
): Promise<string> {
	const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, [
		'decrypt'
	]);

	const plainBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);

	return new TextDecoder().decode(plainBuffer);
}
