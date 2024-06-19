## Prerequisites

Ensure you have the following installed on your local machine:

-   [Node.js](https://nodejs.org/en/download/)
-   [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)
-   [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (if you are using Google services locally)

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/Toursantara/toursantara-api
cd toursantara-api
```

### 2. Install dependencies:

```sh
npm install
```

### 3. Setup Environment Variables:

Create a `.env` file in the root directory of your project and add the necessary environment variables:

```sh
MODEL_URL='' #TODO wait for ML team to give the model & take the URL from Firestore
GCP_PROJECT_ID=your-google-cloud-project-id
GCP_KEYFILE_PATH=path-to-your-service-account-keyfile.json
```

### 4. Application Default Credentials (ADC)

1. Install gcloud cli based on your terminal (Windows/Linux)
2. Check if the gcloud cli is installed by typing:

```sh
gcloud --version
```

3. Initializing the gcloud CLI using :

```sh
gcloud init --no-launch-browser # if using linux use --no-launch-browser
```

4. Config what Email and Project to use

5. Application Default Credentials (ADC), using :

```sh
gcloud auth application-default login --no-launch-browser
```

6. After adc, this text will pop up :

```sh
Credentials saved to file: [/home/user/.config/gcloud/application_default_credentials.json]
```

> **NOTE:** I'm using Linux to ADC, might be different if you are using Windows

### Running the Server

To start the server, run:

```sh
npm run start
```

This will start the server using Node.js.
<br>

Alternatively, for development with automatic server restarts on file changes, you can use nodemon. Run:

```sh
npm run dev
```

### Deploy Google Cloud Run

1. Make `Dockerfile`

2. `Dockerfile` template :

    ```sh
    FROM node:18

    WORKDIR /usr/src/app

    COPY . .

    RUN ls -la credentials/

    COPY package*.json ./

    COPY credentials/serviceAccountKey.json ./credentials/serviceAccountKey.json

    RUN npm install

    COPY . .

    ENV PORT=8080

    CMD ["npm", "start"] # Before deploy cloud run, make sure remove the credentials on .gitignore
    ```

3. Run Cloud Run script :
    ```sh
    gcloud run deploy --source . --port 8080
    ```
    > The port its depends on your setting

### Built With

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
