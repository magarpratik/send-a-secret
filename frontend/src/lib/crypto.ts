export function toBase64(bytes: Uint8Array): string {
	let binary = '';
	const len = bytes.length;

	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}

	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

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
