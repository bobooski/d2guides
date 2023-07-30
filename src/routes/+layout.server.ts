import type { LayoutServerLoad } from "./$types";
import {API_KEY} from "$env/static/private";
import {getMembershipDataForCurrentUser} from "bungie-api-ts/user";
import type {HttpClientConfig} from "bungie-api-ts/user";


export const load = (async ({ cookies }) => {
    if (cookies.get('access_token')) {
        async function $http(config: HttpClientConfig) {
            return fetch(config.url, {
                headers: {
                    'X-API-Key': API_KEY,
                    'Authorization': `Bearer ${cookies.get('access_token')}`
                },

            })
        }

    }

    return { loggedIn: false };
}) satisfies LayoutServerLoad;
