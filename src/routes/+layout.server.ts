import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
    if (cookies.get('access_token')) {
        const response = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': 'Bearer ' + cookies.get('access_token'),
                'X-GitHub-Api-Version': '2022-11-28'
            }
        }).then(res => res.json());
        return { loggedIn: true, user: response }
    }

    return { loggedIn: false };
}) satisfies LayoutServerLoad;
