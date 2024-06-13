# SkruenøglensForum Frontend

Dette er SkruenøglensForum Frontend

Skruenøglens Forum er et forum for bilentusiaster, der kan lide at reparere deres egne biler. Formålet er at skabe et fællesskab, hvor medlemmer kan stille spørgsmål og finde svar på deres bilrelaterede udfordringer ved at udveksle erfaringer og viden med andre.
Dette forum skal fremme samarbejde og støtte blandt bilnørder, så de kan hjælpe hinanden.

Vi præsenterer en dynamisk hjemmeside skabt til bilentusiaster, hvor brugervenlighed og tilgængelighed er i centrum. Hjemmesiden er designet til at være responsive, hvilket betyder, at den automatisk tilpasser sig enhver skærmstørrelse, fra desktop til mobile enheder.

## Funktioner
-   **Registering:** Opret bruger konto

-   **Sikker log ind:** Log ind for bruger og admin.

-   **Søgning og filtrering:** Brugere kan nemt søge efter specifikke opslag ved hjælp af en søgefunktion. Det er også muligt at filtrere opslag efter kategorier eller ved at slå en nummerplade op for at finde relevante opslag.

-   **Brugerfunktionaliteter:**
Brugere kan redigere deres egen profil og tilføje et profilbillede. Når de er logget ind, kan de tilføje og administrere deres biler, redigere og slette dem.

-   **Opslag og kommentarer:**
Brugere kan oprette opslag, de kan tilføje en af deres biler til opslaget og tilføje en kategori og billeder. Når et opslag er oprettet, kan andre brugere kommentere direkte på opslaget eller svare på eksisterende kommentarer. Ejeren af opslaget kan også markere kommentarer som løsning, hvilket fremhæver dem under opslaget.

-   **Administratorrolle:**
En admin har fuld kontrol over platformen. Administratoren kan se, redigere og slette alle brugere, opslag og biler. Derudover kan administratorer bandlyse brugere.

-   **Sikkerhed og adgang:**
For at interagere fuldt ud med platformen skal brugere være logget ind. Dette sikrer, at kun registrerede brugere kan udføre handlinger som at oprette, redigere og slette opslag samt kommentarer.

## Teknologi

-   **Frontend**: SvelteKit
-   **Backend**: Node.js
-   **Database**: MySql
-   **Deployment**: Docker

## Projekt Opsætning
### Lokalt:

1. **Klon Repositoriet**

    ```
    git clone https://github.com/Skruenoglens-forum/SkruenoeglensForumFrontend.git
    ```

2. change directory to the project folder

    ```
    cd SkruenoeglensForumFrontend
    ```

3. **Installer Dependencies**

    ```
    npm install
    ```
4. **Env Variable**

    Hvis du vil køre projektet lokalt, skal du først omdøbe filen `.env.example` til `.env` og derefter udfylde de nødvendige felter.

5. **Køre Skruenøglens API**

    https://github.com/Skruenoglens-forum/skruenoeglensbackend_api

6. **Starte Projektet Lokalt**

    ```
    npm run dev
    ```

### Docker:
For at bygge og køre projektet ved hjælp af Docker, følg disse trin:
1. **Byg Docker Image**
    ```
    docker build -t skruenoeglen_frontend .
    ```
2. **Kør Containeren**
    ```
    docker run -p 8888:8888 skruenoeglen_frontend
    ```
    Herefter er applikationen tilgængelig på `localhost:8888`.

© Emil Storgaard Andersen, 2024.