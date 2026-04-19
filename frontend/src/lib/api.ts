import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { browser } from '$app/environment';

const firebaseConfig = {
	apiKey: 'AIzaSyBJT4AhNLWMoZ1VLgm7dc7Ce-8D0m_tYoA',
	authDomain: 'send-a-secret.firebaseapp.com',
	projectId: 'send-a-secret',
	appId: '1:449855266491:web:317c8e96d63fe52de6139e'
};

const app = initializeApp(firebaseConfig);

if (browser) {
	initializeAppCheck(app, {
		provider: new ReCaptchaEnterpriseProvider('6LfF06gsAAAAAK35ipORkrJ2P25OmcDF7ZtQL1hi'),
		isTokenAutoRefreshEnabled: true
	});
}

const functions = getFunctions(app, 'europe-west1');

export const getSecret = httpsCallable<{ secretId: string }, { ciphertext: string; iv: string }>(
	functions,
	'getSecret'
);

export const checkSecret = httpsCallable<{ secretId: string }, { exists: boolean }>(
	functions,
	'checkSecret'
);

export const storeSecret = httpsCallable<{ ciphertext: string; iv: string }, { secretId: string }>(
	functions,
	'storeSecret'
);
