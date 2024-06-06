# Brug Node.js som baseimage
FROM node:latest

# Opret arbejdsmappe og kopier SvelteKit-appen derind
WORKDIR /usr/src/app
COPY . .

# Installér afhængigheder og byg Svelte-appen
RUN yarn

# manually install jsonwebtoken
RUN yarn add jsonwebtoken

# remove potential security issues

RUN yarn build

# Eksponér port 8888
EXPOSE 8888

# Start SvelteKit-appen
CMD ["yarn", "preview", "--", "--port", "8888", "--host", "0.0.0.0"]