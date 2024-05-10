<script>
    import "../app.css";
    import Header from '../lib/Header.svelte';
    import Footer from '../lib/Footer.svelte';
</script>

<svelte:head>
	<title>Skruenøglens Forum</title>
</svelte:head>

<Header />
<main>
    <slot />
</main>
<Footer year="2024" domain="Skruenøglensforum.dk" name="Emil Storgaard & Alexander Olsen" />