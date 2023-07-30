<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

    import { AppBar, AppShell, Avatar, Drawer, drawerStore, LightSwitch, popup, storePopup } from "@skeletonlabs/skeleton";
    import type { DrawerSettings, PopupSettings } from '@skeletonlabs/skeleton';
    import type { LayoutServerData } from "./$types";
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    const drawerSettings: DrawerSettings = {
        id: 'nav-drawer',
        position: 'right',
        height: 'h-full',
        width: 'w-3/4',
        padding: 'p-0'
    }

    const popupFeatured: PopupSettings = {
        event: 'click',
        target: 'popupFeatured',
        placement: 'bottom'
    };

    function openDrawer() {
        drawerStore.open(drawerSettings);
    }

    function closeDrawer() {
        drawerStore.close();
    }

    export let data: LayoutServerData;
</script>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead">
                <a href="/"><img class="w-8" src="/images/ghost.svg" alt="" /></a>
            </svelte:fragment>

            <a href="/" class="h3">D2 Guides</a>

            <svelte:fragment slot="trail">
                <LightSwitch />

                <button class="sm:hidden btn-sm variant-ghost-surface" on:click={openDrawer}>
                    <i class='bx bx-menu scale-150'></i>
                </button>

                <Drawer>
                    {#if data.loggedIn}
                        <div class="flex gap-5 m-5 items-center">
                            <Avatar src="{data.user.avatar_url}" width="w-1/6" rounded="rounded-full" shadow="shadow-lg" />
                            <div class="flex flex-col gap-1">
                                <p>Hi there, <strong class="underline">@{data.user.login}</strong>!</p>
                                <small class="text-surface-600-300-token">Signed in with GitHub.</small>
                            </div>
                        </div>

                        <hr />

                        <div class="flex justify-center w-full my-5">
                            <a href="/guides" on:click={closeDrawer} class="btn flex gap-3 variant-ghost-primary mx-3 w-full text-sm">
                                <i class='bx bx-book-bookmark scale-125'></i>
                                Guides
                            </a>
                            <a href="/logout" class="btn variant-ghost-error w-full mx-3 text-sm">Sign Out</a>
                        </div>

                        <hr/>

                        <a class="flex gap-3 items-center w-full py-2 px-3 rounded-md hover:bg-surface-50-900-token cursor-no-drop">
                            <i class='bx bx-user scale-110'></i>
                            <a class="">Your Profile</a>
                        </a>
                        <a class="flex gap-3 items-center w-full py-2 px-3 rounded-md hover:bg-surface-50-900-token cursor-no-drop">
                            <i class='bx bx-folder scale-110'></i>
                            <a class="">Your Contributions</a>
                        </a>
                        <a class="flex gap-3 items-center w-full py-2 px-3 rounded-md hover:bg-surface-50-900-token cursor-no-drop">
                            <i class='bx bx-cog scale-110'></i>
                            <a class="">Settings</a>
                        </a>
                    {:else}
                        <div class="flex gap-5 m-5 items-center">
                            <Avatar initials="?" width="w-1/6" rounded="rounded-full" shadow="shadow-lg" />
                            <div class="flex flex-col gap-1">
                                <p>Hi there!</p>
                                <small class="text-surface-600-300-token">You are not signed in.</small>
                            </div>
                        </div>

                        <hr />

                        <div class="flex justify-center w-full my-5">
                            <a href="/guides" on:click={closeDrawer} class="btn flex gap-3 variant-ghost-primary mx-3 w-full text-sm">
                                <i class='bx bx-book-bookmark scale-125'></i>
                                Guides
                            </a>
                            <a href="/login" class="btn flex gap-3 variant variant-ghost-surface w-full mx-3 text-sm">
                                Login
                            </a>
                        </div>

                        <hr/>
                    {/if}
                </Drawer>

                <a href="/guides" class="hidden sm:flex btn variant-ghost-primary gap-3 hover:cursor-pointer">
                    <i class='bx bx-book-bookmark scale-125'></i>
                    Guides
                </a>
                {#if !data.loggedIn}
                    <a href="/login" class="hidden sm:flex btn variant-ghost-surface gap-3 hover:cursor-pointer">
                        Login with Bungie
                    </a>
                {:else}
                    <button class="btn p-0 hidden sm:flex" use:popup={popupFeatured}>
                        <Avatar src="{data.user.avatar_url}" width="w-10" rounded="rounded-full" />
                    </button>

                    <div class="card p-4 w-64 shadow-xl" data-popup="popupFeatured">
                        <a class="flex gap-3 items-center w-full py-2 px-3 rounded-md hover:bg-surface-50-900-token cursor-no-drop">
                            <i class='bx bx-user scale-110'></i>
                            <a class="">Your Profile</a>
                        </a>
                        <a class="flex gap-3 items-center w-full py-2 px-3 rounded-md hover:bg-surface-50-900-token cursor-no-drop">
                            <i class='bx bx-folder scale-110'></i>
                            <a class="">Your Contributions</a>
                        </a>
                        <a class="flex gap-3 items-center w-full py-2 px-3 rounded-md hover:bg-surface-50-900-token cursor-no-drop">
                            <i class='bx bx-cog scale-110'></i>
                            <a class="">Settings</a>
                        </a>
                        <hr class="my-3" />
                        <a href="/logout" class="btn variant-ghost-error text-sm w-full">Sign Out</a>
                    </div>
                {/if}

                <div class="card p-4 w-72 shadow-xl" data-popup="profilePopup"></div>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <slot />

    <svelte:fragment slot="footer">

    </svelte:fragment>
</AppShell>
