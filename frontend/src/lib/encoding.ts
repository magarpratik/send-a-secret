export function toBase64(bytes: Uint8Array): string {
	let binary = '';
	const len = bytes.length;

	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}

	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function fromBase64(base64url: string): Uint8Array<ArrayBuffer> {
	const base64 = base64url
		.replace(/-/g, '+')
		.replace(/_/g, '/')
		.padEnd(base64url.length + ((4 - (base64url.length % 4)) % 4), '=');

	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);

	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}

	return bytes;
}
