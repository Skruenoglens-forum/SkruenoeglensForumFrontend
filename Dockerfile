# Brug Node.js som baseimage
FROM node:latest

# Opret arbejdsmappe og kopier SvelteKit-appen derind
WORKDIR /usr/src/app
COPY . .

# Installér afhængigheder og byg Svelte-appen
RUN npm install
RUN npm run build

# Eksponér port 8888
EXPOSE 8888

# Start SvelteKit-appen
CMD ["npm", "run", "preview", "--", "--port", "8888", "--host", "0.0.0.0"]
