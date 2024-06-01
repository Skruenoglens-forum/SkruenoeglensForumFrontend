<script>
	// Function to handle accordion toggle
	function toggleAccordion(event) {
		const button = event.currentTarget;
		const bodyId = button.getAttribute('data-accordion-target');
		const body = document.querySelector(bodyId);

		// Toggle the 'hidden' class
		body.classList.toggle('hidden');

		// Update aria-expanded attribute
		const isExpanded = button.getAttribute('aria-expanded') === 'true';
		button.setAttribute('aria-expanded', !isExpanded);
	}
</script>

<div class="relative mt-12 mb-12 mx-auto w-full md:w-1/2">
	<div class="rounded overflow-hidden shadow-md mx-4">
		<div id="accordion-nested-parent" data-accordion="collapse">
			<h2 id="accordion-collapse-heading-1">
				<div
					class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl gap-3"
				>
					<span>Om Skruenøglens Forum</span>
				</div>
			</h2>
			<div
				id="accordion-collapse-body-1"
				class=""
				aria-labelledby="accordion-collapse-heading-1"
			>
				<div class="p-5 border border-b-0 border-gray-200">
					<p class="mb-2 text-gray-500">
						Velkommen til Skruenøglens Forum – Det ultimative bilforum for hobbymekanikere! Vi har
						skabt en platform, der kombinerer en brugervenlig hjemmeside og en avanceret API,
						designet til at hjælpe dig med at diagnosticere og reparere din bil.
					</p>
					<p class="mb-2 text-gray-500">
						Vores mission er at gøre det nemt for dig at finde de oplysninger, du har brug for, så
						du hurtigt og effektivt kan få din bil tilbage på vejen.
					</p>
				</div>
			</div>
			<h2 id="accordion-collapse-heading-2">
				<button
					type="button"
					class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-100 gap-3"
					data-accordion-target="#accordion-collapse-body-2"
					aria-expanded="false"
					aria-controls="accordion-collapse-body-2"
					on:click={toggleAccordion}
				>
					<span class="flex items-center"
						><svg
							class="w-5 h-5 me-2 shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clip-rule="evenodd"
							></path></svg
						> Hvad vi tilbyder?</span
					>
					<svg
						data-accordion-icon
						class="w-3 h-3 rotate-180 shrink-0"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5 5 1 1 5"
						/>
					</svg>
				</button>
			</h2>
			<div
				id="accordion-collapse-body-2"
				class="hidden"
				aria-labelledby="accordion-collapse-heading-2"
			>
				<div class="p-5 border border-gray-200">
					<!-- Nested accordion -->
					<div id="accordion-nested-collapse" data-accordion="collapse">
						<h2 id="accordion-nested-collapse-heading-1">
							<button
								type="button"
								class="flex items-center justify-between w-full p-5 rounded-t-xl font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 hover:bg-gray-100 gap-3"
								data-accordion-target="#accordion-nested-collapse-body-1"
								aria-expanded="false"
								aria-controls="accordion-nested-collapse-body-1"
								on:click={toggleAccordion}
							>
								<span>Brugervenlighed i centrum</span>
								<svg
									data-accordion-icon
									class="w-3 h-3 rotate-180 shrink-0"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5 5 1 1 5"
									/>
								</svg>
							</button>
						</h2>
						<div
							id="accordion-nested-collapse-body-1"
							class="hidden"
							aria-labelledby="accordion-nested-collapse-heading-1"
						>
							<div class="p-5 border border-b-0 border-gray-200">
								<p class="text-gray-500">
									Vi forstår vigtigheden af en intuitiv og let navigerbar hjemmeside.
								</p>
								<p class="text-gray-500">
									Vores platform er designet med fokus på brugerinteraktivitet, så du nemt kan finde, dele og diskutere bilproblemer og løsninger med andre hobbymekanikere.
								</p>
							</div>
						</div>

						<h2 id="accordion-nested-collapse-heading-2">
							<button
								type="button"
								class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 hover:bg-gray-100 gap-3"
								data-accordion-target="#accordion-nested-collapse-body-2"
								aria-expanded="false"
								aria-controls="accordion-nested-collapse-body-2"
								on:click={toggleAccordion}
							>
								<span>Nummerplade-søgning</span>
								<svg
									data-accordion-icon
									class="w-3 h-3 rotate-180 shrink-0"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5 5 1 1 5"
									/>
								</svg>
							</button>
						</h2>
						<div
							id="accordion-nested-collapse-body-2"
							class="hidden"
							aria-labelledby="accordion-nested-collapse-heading-2"
						>
							<div class="p-5 border border-b-0 border-gray-200">
								<p class="text-gray-500">
									Med vores unikke søgefunktion kan du indtaste din bils nummerplade for at finde relevante opslag og oplysninger specifikt til din bil.
								</p>
								<p class="text-gray-500">
									Dette sparer dig tid og besvær med at søge gennem irrelevante informationer.
								</p>
							</div>
						</div>

						<h2 id="accordion-nested-collapse-heading-3">
							<button
								type="button"
								class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-100 gap-3"
								data-accordion-target="#accordion-nested-collapse-body-3"
								aria-expanded="false"
								aria-controls="accordion-nested-collapse-body-3"
								on:click={toggleAccordion}
							>
								<span>Kategorisering og organisering</span>
								<svg
									data-accordion-icon
									class="w-3 h-3 rotate-180 shrink-0"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5 5 1 1 5"
									/>
								</svg>
							</button>
						</h2>
						<div
							id="accordion-nested-collapse-body-3"
							class="hidden"
							aria-labelledby="accordion-nested-collapse-heading-3"
						>
							<div class="p-5 border border-gray-200">
								<p class="mb-2 text-gray-500">
									Alle opslag er nøje kategoriseret for at sikre, at du hurtigt kan finde præcis den information, du har brug for.
								</p>
								<p class="mb-2 text-gray-500">
									Uanset om det drejer sig om motorproblemer, elektriske systemer eller karosseri, har vi kategorier, der dækker alle aspekter af bilreparation og vedligeholdelse.
								</p>
							</div>
						</div>

						<!-- Additional Nested Accordions -->

						<h2 id="accordion-nested-collapse-heading-4">
							<button
								type="button"
								class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-100 gap-3"
								data-accordion-target="#accordion-nested-collapse-body-4"
								aria-expanded="false"
								aria-controls="accordion-nested-collapse-body-4"
								on:click={toggleAccordion}
							>
								<span>Langsigtet datalagring</span>
								<svg
									data-accordion-icon
									class="w-3 h-3 rotate-180 shrink-0"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5 5 1 1 5"
									/>
								</svg>
							</button>
						</h2>
						<div
							id="accordion-nested-collapse-body-4"
							class="hidden"
							aria-labelledby="accordion-nested-collapse-heading-4"
						>
							<div class="p-5 border border-gray-200">
								<p class="mb-2 text-gray-500">
									Vi værdsætter den akkumulerede viden på vores forum.
								</p>
								<p class="mb-2 text-gray-500">
									Derfor gemmes data i lange perioder og slettes kun, hvis de overskrider vores terms of service, eller hvis ejeren vælger at fjerne dem.
								</p>
								<p class="mb-2 text-gray-500">
									Dette sikrer, at vigtige oplysninger forbliver tilgængelige for fremtidige brugere.
								</p>
							</div>
						</div>

						<h2 id="accordion-nested-collapse-heading-5">
							<button
								type="button"
								class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-100 gap-3"
								data-accordion-target="#accordion-nested-collapse-body-5"
								aria-expanded="false"
								aria-controls="accordion-nested-collapse-body-5"
								on:click={toggleAccordion}
							>
								<span>Vores vision</span>
								<svg
									data-accordion-icon
									class="w-3 h-3 rotate-180 shrink-0"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5 5 1 1 5"
									/>
								</svg>
							</button>
						</h2>
						<div
							id="accordion-nested-collapse-body-5"
							class="hidden"
							aria-labelledby="accordion-nested-collapse-heading-5"
						>
							<div class="p-5 border border-gray-200">
								<p class="mb-2 text-gray-500">
									Skruenøglens Forum er skabt med visionen om at opbygge et stærkt fællesskab af hobbymekanikere, der deler deres erfaringer og ekspertise.
								</p>
								<p class="mb-2 text-gray-500">
									Vi tror på, at vidensdeling er nøglen til succes, og vi stræber efter at skabe en platform, hvor både nye og erfarne mekanikere kan lære og vokse sammen.
								</p>
							</div>
						</div>

					</div>
					<p class="mb-2 mt-2 text-gray-500">Tak fordi du besøger Skruenøglens Forum. Vi håber, du finder vores ressourcer nyttige og vores community imødekommende. Sammen kan vi gøre bilreparation enklere og mere tilgængelig for alle.</p>
					<!-- End: Nested accordion -->
				</div>
			</div>
		</div>
	</div>
</div>
