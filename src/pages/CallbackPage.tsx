import { useAuth } from '@/hooks/use-auth';
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

export function CallbackPage() {
	const { handleLoginSuccess } = useAuth();
	const navigate = useNavigate();
	const hasCalledProvider = useRef(false);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');

		if (code && !hasCalledProvider.current) {
			hasCalledProvider.current = true; // Mark that we've already used it
			exchangeCodeForToken(code);
		}
	}, []);

	const exchangeCodeForToken = async (code: string) => {
		try {
			const response = await fetch('https://api.trakt.tv/oauth/token', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					code: code,
					client_id: import.meta.env.VITE_TRAKT_CLIENT_ID,
					client_secret: import.meta.env.VITE_TRAKT_CLIENT_SECRET, // OJO AQUÍ!
					redirect_uri: import.meta.env.VITE_TRAKT_REDIRECT_URI,
					grant_type: 'authorization_code',
				}),
			});

			const data = await response.json();

			if (data.access_token) {
				localStorage.setItem('trakt_token', data.access_token);

				// 1. Get the direction checkpoint
				const returnTo = sessionStorage.getItem('return_to') || '/'; // '/' by default
				
				// 2. Clear the checkpoint
				sessionStorage.removeItem('return_to');

				await handleLoginSuccess(data.access_token)

				// 3. redirect
				navigate(returnTo);
			}
		} catch (error) {
			console.error('Failed to exchange authorization code for token', error)
		}
	};
	
	return <p>Loading...</p>
}