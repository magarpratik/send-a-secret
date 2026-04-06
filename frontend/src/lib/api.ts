import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
	apiKey: 'AIzaSyBJT4AhNLWMoZ1VLgm7dc7Ce-8D0m_tYoA',
	authDomain: 'send-a-secret.firebaseapp.com',
	projectId: 'send-a-secret',
	appId: '1:449855266491:web:317c8e96d63fe52de6139e'
};

const app = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
	initializeAppCheck(app, {
		provider: new ReCaptchaEnterpriseProvider('6LfF06gsAAAAAK35ipORkrJ2P25OmcDF7ZtQL1hi'),
		isTokenAutoRefreshEnabled: true
	});
}

const functions = getFunctions(app, 'europe-west1');

export const postSecret = httpsCallable<unknown, { secretId: string }>(functions, 'postSecret');
export const getSecret = httpsCallable(functions, 'getSecret');
