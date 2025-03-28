# Nuxt 3 Authentication Demo

A simple Nuxt 3 app with authentication, account management, and data filtering.

## Tech Stack

- **Nuxt 3**: Vue.js framework
- **TypeScript**: Type safety
- **Pinia**: State management
- **Tailwind CSS**: Styling

## Features

- User login and session persistence
- Protected pages
- Product dashboard
- Filters: date range, category selection

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

1. **Build the app**: `npm run build`
2. **Set up environment**: Configure variables, database, and SSL
3. **Deploy**:
    - Static hosting: `npm run generate` (Netlify, Vercel, etc.)
    - Server: Use PM2, Nginx, and monitoring tools
4. **Post-deployment**: Test, monitor, and back up

## Links

- [Live Demo](https://nuxt-auth-app-89.netlify.app/)
- [Sample Users](https://nuxt-auth-app-89.netlify.app/users.json)
