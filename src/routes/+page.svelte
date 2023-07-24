<script>
    import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
    import {onMount} from "svelte";

    onMount(async () => {
        document.title = 'D2 Guides | Home';
    });
</script>

<div class="flex items-center justify-center gap-5 sm:gap-10 md:gap-20 lg:gap-36">
    <img class="w-1/3 md:w-1/4 my-20" src="images/ghost.svg" alt="" />

    <div class="flex flex-col items-center justify-center my-10 gap-3">
        <h2 class="h2">Ad Free.</h2>
        <h2 class="h2">Open Source.</h2>
        <h2 class="h2">Crowd Sourced.</h2>
        <h2 class="h2 text-primary-400">FOREVER.</h2>
    </div>
</div>

<div class="flex flex-col justify-center mx-5 md:mx-10 lg:mx-24 my-10 gap-5">
    <h4 class="h4">Frequently Asked Questions</h4>

    <Accordion class="card p-3">
        <AccordionItem>
            <!-- <svelte:fragment slot="lead"></svelte:fragment> -->
            <svelte:fragment slot="summary">
                <h6 class="h6">What is D2 Guides?</h6>
            </svelte:fragment>
            <svelte:fragment slot="content">
                D2 Guides is an open-source website created by bobooski to be an ad-free
                solution to the lack of a good place to look up high-quality tutorials
                for quests, raids, and dungeons.
            </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
            <svelte:fragment slot="summary">
                <h6 class="h6">Why was D2 Guides created?</h6>
            </svelte:fragment>
            <svelte:fragment slot="content">
                D2 Guides was created because a lot of text and image based guides for
                quests, raids, and dungeons don't have enough information or good images
                along routes to easily display what needs to be done.
            </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
            <svelte:fragment slot="summary">
                <h6 class="h6">How can I contribute a guide?</h6>
            </svelte:fragment>
            <svelte:fragment slot="content">
                Currently there is no good way for individuals to contribute guides without
                digging in deep to the source code on GitHub and directly making a pull
                request. There are plans to create an in-depth editor in order to easily
                create, edit, and manage guides without leaving the website.
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>