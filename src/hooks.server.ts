import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import {API_KEY, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, REDIRECT_URI} from "$env/static/private";
import { nanoid } from 'nanoid';

export const handle = (async ({ event, resolve }): Promise<Response> => {

    if (event.url.pathname.startsWith('/login')) {
        if (event.cookies.get('access_token')) throw redirect(308, REDIRECT_URI);

        const state = nanoid();
        event.cookies.set('state', state);

        const params = new URLSearchParams({
            client_id: OAUTH_CLIENT_ID,
            response_type: 'code',
            state: state
        });

        throw redirect(307, 'https://www.bungie.net/en/oauth/authorize?' + params);
    }

    if (event.url.pathname.startsWith('/logout')) {
        event.cookies.delete('access_token');
        throw redirect(308, REDIRECT_URI);
    }

    if (event.url.searchParams.has('code') && event.url.searchParams.has('state')) {
        if (!event.cookies.get('state')) throw redirect(308, REDIRECT_URI);

        const stateFromUrl = event.url.searchParams.get('state');
        const stateFromCookie = event.cookies.get('state');
        if (stateFromCookie !== stateFromUrl) throw redirect(308, REDIRECT_URI);
        event.cookies.delete('state');

        const response = await fetch('https://www.bungie.net/platform/app/oauth/token/', {
            method: 'POST',
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: event.url.searchParams.get('code')?? '',
                client_id: OAUTH_CLIENT_ID,
                client_secret: OAUTH_CLIENT_SECRET
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return new Response(`Success! access_token: ${data.access_token}, refresh_token: ${data.refresh_token}`);
        } else {
            return new Response('Something went wrong! :(')
        }

    }

    return resolve(event);
}) satisfies Handle;
