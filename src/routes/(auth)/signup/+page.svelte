<script>
	export let form

  let imageUrl = '';

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
</script>

<section class="bg-gray-0">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img class="w-16 h-16 mr-2" src="/favicon.png" alt="logo">   
        </a>
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Opret bruger
                </h1>
                <form class="space-y-4 md:space-y-6" action="?/signup" method="POST" enctype="multipart/form-data">
                    <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mx-auto">
                        {#if imageUrl}
                            <img src={imageUrl} alt="Profile" class="object-cover w-full h-full"/>
                        {/if}
                    </div>
                    <div class="relative mx-auto">
                        <input on:change={handleFileUpload} class="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-600 file:disabled:opacity-50 file:disabled:pointer-events-none" type="file" name="profileImage" accept="image/*" />
                    </div>
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name *</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Jens Jensen" required="">
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email *</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="jens@jensen.com" required="">
                    </div>
                    <div>
                      <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Beskrivelse</label>
                      <input type="text" name="description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Skriv lidt om dig selv">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password *</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required="">
                    </div>
                    <div>
                        <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900">Gentag Password *</label>
                        <input type="password" name="repeat-password" id="repeat-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required="">
                    </div>
                    <button type="submit" class="w-full button signup-button">Opret bruger</button>
                </form>
            </div>
        </div>
    </div>
  </section>

{#if form?.invalid}
  <p>Invalid values.</p>
{/if}

{#if form?.pwdMatch}
  <p>Password does not match.</p>
{/if}

{#if form?.user}
  <p>Email is taken.</p>
{/if}

<style>
	/* Tilpasninger af knapstil */
	.button {
	  @apply px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out;
	}
  
	/* Blå knapstil */
	.signup-button {
	  @apply bg-blue-500 text-white hover:bg-blue-600;
	}
</style>