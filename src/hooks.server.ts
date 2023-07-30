import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import {API_KEY, OAUTH_CLIENT_ID, REDIRECT_URI} from "$env/static/private";
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

        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code: event.url.searchParams.get('code') ?? ''
        });

        const response = await fetch('ttps://www.bungie.net/Platform/App/OAuth/token?' + params, {
            headers: {
                'Authorization': `Basic ${API_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json());

        event.cookies.set('access_token', response.access_token, { maxAge: response.expires_in });
        event.cookies.set('refresh_token', response.refresh_token, { maxAge: response.refresh_expires_in });
        throw redirect(308, REDIRECT_URI);
    }

    return resolve(event);
}) satisfies Handle;
