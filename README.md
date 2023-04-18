# Slivki QR code menu

And food delivery service soon!

## Project structure

```
├───.husky - used for pre-commit prettier formatting
├───.vscode - VSCode settings
├───public - static files
└───src
    ├───app
    │   ├───(viewer) - what normal visitors will see
    │   ├───admin - admin panel
    │   └───api - API endpoints
    ├───components - React components
    │   ├───*name*.tsx - Basic layouts for components
    │   ├───*name*Viewer.tsx - Viewer components
    │   └───*name*Editor.tsx - Admin components
    ├───hooks - React hooks
    ├───lib - Things for interacting with external APIs
    ├───models - Mongoose models
    ├───pages - Only used for NextAuth until NextAuth supports app route
    └───utils - Utility functions
        ├───client - Client-side only
        └───server - Server-side only
```

## Required environment variables

-   MONGODB_URI - MongoDB connection string
-   MONGODB_DBNAME - MongoDB database name
-   NEXTAUTH_SECRET - NextAuth secret
-   NEXTAUTH_URL - URL of where you host your website, i.e. https://slivki.vercel.app/ or http://localhost:3000/. Is used in a lot more places than just NextAuth.
-   PROJECT_ID - Google Cloud project ID
-   CLIENT_EMAIL - Google Cloud client email
-   PRIVATE_KEY - Google Cloud private key
-   BUCKET_NAME - Google Cloud bucket name
