import type { LayoutServerLoad } from "./$types";
import {API_KEY} from "$env/static/private";

export const load = (async ({ cookies }) => {
    if (cookies.get('access_token')) {
        const response = await fetch('https://bungie.net/Platform/User/GetMembershipsForCurrentUser', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + cookies.get('access_token'),
                'X-API-Key': API_KEY
            }
        }).then(res => res.json());
        return { loggedIn: true, user: response }
    }

    return { loggedIn: false };
}) satisfies LayoutServerLoad;
