import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { dev } from '$app/environment';
import { CLIENT_ID, CLIENT_SECRET } from "$env/static/private";
import { nanoid } from 'nanoid';

type TokenResponse = {
    access_token: string,
    scope: string,
    token_type: string
};

export const handle = (async ({ event, resolve }): Promise<Response> => {
    const redirectUri = dev ? 'http://localhost:5173' : 'https://d2guides.net';
    if (event.url.pathname.startsWith('/login')) {
        if (event.cookies.get('access_token')) throw redirect(308, redirectUri);

        const state = nanoid(15);

        event.cookies.set('state', state);

        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            redirect_uri: redirectUri,
            scope: 'read:user',
            state: state
        });

        throw redirect(307, 'https://github.com/login/oauth/authorize?' + params);
    }

    if (event.url.pathname.startsWith('/logout')) {
        event.cookies.delete('access_token');
        throw redirect(308, redirectUri);
    }

    if (event.url.searchParams.has('code') && event.url.searchParams.has('state')) {
        if (!event.cookies.get('state')) throw redirect(308, redirectUri);

        const code = event.url.searchParams.get('code') ?? '';
        const stateFromUrl = event.url.searchParams.get('state');
        const stateFromCookie = event.cookies.get('state');

        if (stateFromCookie !== stateFromUrl) throw redirect(308, redirectUri);
        event.cookies.delete('state');

        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: redirectUri
        });

        const response: TokenResponse = await fetch('https://github.com/login/oauth/access_token?' + params, {
            method: 'POST',
            headers: {
                'Accept': "application/json"
            }
        }).then(res => res.json());

        event.cookies.set('access_token', response.access_token);
    }

    return resolve(event);
}) satisfies Handle;
