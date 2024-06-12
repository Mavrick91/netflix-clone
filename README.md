# Netflix Clone

This is a clone of the original Netflix platform. Users can sign up, log in, view movies/series, and display some details. Additionally, there is an account section where users can update their password and email as well as subscribe to a plan using the Stripe API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Features](#features)

## Installation

### Prerequisites

- Node.js (v20.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- Firebase project set up
- Stripe account and keys
- TMDB (The Movie Database) API key

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/Mavrick91/netflix-clone
   cd netflix-clone
   ```

2. **Install dependencies**
   Using npm:
   ```sh
   npm install
   ```
   Or using yarn:
   ```sh
   yarn install
   ```

3. **Set up environment variables**
   You need to create a `.env.local` file in the root of your project for environment-specific variables. Here are the variables you need to add:

    ```env
    GOOGLE_TYPE="="*******************""
    GOOGLE_PROJECT_ID="*******************"
    GOOGLE_PRIVATE_KEY_ID="*******************"
    GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n*************\n-----END PRIVATE KEY-----\n"
    GOOGLE_CLIENT_EMAIL="*******************"
    GOOGLE_CLIENT_ID="********************"
    GOOGLE_AUTH_URI="*******************"
    GOOGLE_TOKEN_URI="*******************"
    GOOGLE_AUTH_PROVIDER_X509_CERT_URL="*******************"
    GOOGLE_CLIENT_X509_CERT_URL="*******************"

    TMDB_API_KEY="********************"

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="********************"
    STRIPE_SECRET_KEY="********************"

    STRIPE_WEBHOOK_SECRET="********************"
    ```

## Usage

### Running Locally
To start the development server, run:
```sh
npm run dev
```
Or with yarn:
```sh
yarn dev
```

### Building and Running in Production
To create an optimized production build, run:
```sh
npm run build
```
Or with yarn:
```sh
yarn build
```
Start the application in production mode, run:
```sh
npm start
```
Or with yarn:
```sh
yarn start
```

## Configuration

### Firebase
1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to the Project settings and add a new Web app to get your Firebase configuration.
3. Update the `.env.local` file with your Firebase configuration as provided above.

### Stripe
1. Create a Stripe account in the [Stripe Dashboard](https://dashboard.stripe.com/).
2. Obtain your Stripe public and secret keys and update the `.env.local` file as provided above.
3. Set up a webhook endpoint for the webhooks, and update the `STRIPE_WEBHOOK_SECRET` in the `.env.local` file.

### TMDB
1. Create an account at [TMDB](https://www.themoviedb.org/).
2. Navigate to your account settings and generate an API key.
3. Update the `.env.local` file with your TMDB API key as provided above.

## Features
- **Authentication**: Sign up, log in, and secure authorization using Firebase.
- **Movie/Series Listings**: Browse, search, and view details of movies and series using the TMDB API.
- **User Account Management**: Update user details like email and password.
- **Subscription Plans**: Integration with Stripe API for subscribing to different plans.

## Note
The TMDB API is used to fetch movie and TV show data, so a TMDB API key is required for the project to function correctly. Make sure to add your TMDB API key in the `.env.local` file.