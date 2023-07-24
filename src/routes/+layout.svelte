<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

    import {AppBar, AppShell, Drawer, drawerStore } from "@skeletonlabs/skeleton";
    import type { DrawerSettings } from '@skeletonlabs/skeleton';

    const drawerSettings: DrawerSettings = {
        id: 'nav-drawer',
        position: 'right',
        height: 'h-16',
        width: 'w-full',
        padding: 'p-0'
    }

    function openDrawer() {
        drawerStore.open(drawerSettings);
    }

    function closeDrawer() {
        drawerStore.close();
    }
</script>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead">
                <a href="/"><img class="w-8" src="/images/ghost.svg" alt="" /></a>
            </svelte:fragment>

            <a href="/" class="h3">D2 Guides</a>

            <svelte:fragment slot="trail">
                <button class="sm:hidden btn-icon" on:click={openDrawer}>
                    <i class="fa-solid fa-bars scale-125"></i>
                </button>

                <Drawer>
                    <div class="flex gap-3 items-center justify-center m-2">
                        <a href="/guides" on:click={closeDrawer} class="flex btn variant-ghost-primary gap-3 hover:cursor-pointer">
                            <i class="fa-solid fa-book scale-110"></i>
                            Guides
                        </a>

                        <a on:click={closeDrawer} class="flex btn variant-ghost-surface gap-3 hover:cursor-pointer">
                            <i class="fa-brands fa-github scale-110"></i>
                            Login with GitHub
                        </a>
                    </div>
                </Drawer>

                <a href="/guides" class="hidden sm:flex btn variant-ghost-primary gap-3 hover:cursor-pointer">
                    <i class="fa-solid fa-book scale-110"></i>
                    Guides
                </a>
                <a class="hidden sm:flex btn variant-ghost-surface gap-3 hover:cursor-pointer">
                    <i class="fa-brands fa-github scale-110"></i>
                    Login with GitHub
                </a>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <slot />

    <svelte:fragment slot="footer">

    </svelte:fragment>
</AppShell>
