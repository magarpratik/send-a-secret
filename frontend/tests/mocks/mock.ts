type SecretRecord = {
	id: string;
	ciphertext: string;
	iv: string;
};

const store: SecretRecord[] = [];

export function resetStore() {
	store.length = 0;
}

export function storeSecretMock(data: { ciphertext: string; iv: string }) {
	const id = crypto.randomUUID();

	store.push({
		id,
		...data
	});

	return {
		data: { secretId: id }
	};
}

export function getSecretMock({ secretId }: { secretId: string }) {
	const record = store.find((s) => s.id === secretId);

	if (!record) {
		throw new Error('Secret not found');
	}

	return {
		data: {
			ciphertext: record.ciphertext,
			iv: record.iv
		}
	};
}
