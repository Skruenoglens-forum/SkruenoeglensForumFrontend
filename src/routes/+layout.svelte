<script>
    import "../styles/app.css";
    import Header from '../lib/Header.svelte';
    import Footer from '../lib/Footer.svelte';
</script>

<svelte:head>
	<title>Skruenøglens Forum</title>
</svelte:head>

<Header />
<main class="mb-24">
    <slot />
</main>
<Footer year="2024" domain="Skruenøglensforum.dk" name="Emil Storgaard & Alexander Olsen" />