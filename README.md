# Slivki QR code menu

And food delivery!

## Tehnologies used

-   Next.js - React framework
-   Typescript - Types
-   MongoDB - Database
-   NextAuth - Authentication
-   Telegram API - Bot for receiving orders
-   Google Cloud Storage - For storing images
-   TailwindCSS - CSS framework
-   DaisyUI - TailwindCSS components
-   Vercel - Hosting

## Project structure

```
├───.husky - used for pre-commit prettier formatting
├───.vscode - VSCode settings
├───public - static files
└───src
    ├───app
    │   ├───[lang] - what normal visitors will see
    │   │   └───checkout - checkout page
    │   │       └───success - successful order page
    │   ├───admin - admin panel
    │   ├───api - API endpoints
    │   │   └───auth - NextAuth endpoints
    │   ├───order - order api
    │   └───telegram - Telegram bot
    │       ├───setup - sets up webhook
    │       └───webhook - receives updates from Telegram
    ├───components - React components
    │   ├───*name*.tsx - Basic layouts for components
    │   ├───*name*Viewer.tsx - Viewer components
    │   └───*name*Editor.tsx - Admin components
    ├───hooks - React hooks
    ├───lib - Things for interacting with external APIs
    ├───dictionaries - Dictionaries for translations
    ├───models - Mongoose models
    └───utils - Utility functions
        ├───client - Client-side only
        └───server - Server-side only
```

## Required environment variables

MongoDB

-   MONGODB_URI - MongoDB connection string
-   MONGODB_DBNAME - MongoDB database name

NextAuth

-   NEXTAUTH_SECRET - NextAuth secret
-   NEXTAUTH_URL - URL of where you host your website, i.e. https://slivki.vercel.app/ or http://localhost:3000/. Is used in a lot more places than just NextAuth.

Google Cloud

-   PROJECT_ID - Google Cloud project ID
-   CLIENT_EMAIL - Google Cloud client email
-   PRIVATE_KEY - Google Cloud private key
-   BUCKET_NAME - Google Cloud bucket name

Telegram

-   TELEGRAM_TOKEN - Telegram bot token
-   TELEGRAM_SECRET - Secret code that telegram will send with its webhook requests
-   TELEGRAM_PASSWORD - Code that user needs to send to be registered as listener for updates

ReCAPTCHA

-   NEXT_PUBLIC_RECAPTCHA_SITE_KEY - Recaptcha site key
-   RECAPTCHA_SECRET - Recaptcha secret
