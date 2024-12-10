# TanStack Start Example with Basic Auth

This project is a basic authentication example using TanStack, Prisma, and TailwindCSS.

## Videos
- See walkthrough of application here in this video - https://youtu.be/kpjU2nMbZdw
- First video setting up basic Tanstack Start Application - https://youtu.be/oOqjZWpb-EI

## Project Structure


- `/app`: Contains the main application code
   - `/components`: Reusable React components
   - `/routes`: Route components and API handlers
      - `/_authed`: Route Components for authenticated users
   - `/styles`: CSS styles, including Tailwind configuration
   - `/utils`: Utility functions and services
   - `/prisma`: Database schema and migrations
   - `/public`: Static assets


## Features

- React-based frontend with TanStack Router for routing
- Authentication - Login, Logout, Create Account
- Protecting Pages for Authenticated Users
- Saving Information In Session
- Server-side rendering (SSR) support
- SQLite database integration using Prisma ORM
- API routes for backend functionality
- Tailwind CSS for styling

## Technologies Used

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [Prisma ORM](https://www.prisma.io/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [SQLite](https://www.sqlite.org/)


## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the database:
   ```
   npm run generate
   npm run push
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production-ready application
- `npm run start`: Start the production server
- `npm run generate`: Generate Prisma ORM schema
- `npm run push`: Push schema changes to the database
- `npm run studio`: Open Prisma Studio for database management
- `npm run format`: Format code using Prettier
- `npm run lint`: Lint the codebase using ESLint
- `npm run test`: Run the test suite

## Development

This project uses Vite for fast development and building. The development server will rebuild assets
on file changes.

## Database

The project uses SQLite with Prisma ORM. The database schema is defined in `prisma/schema.prismas.ts`. You
can use Prisma Studio to manage your database by running `npm run studio`.

## Routing

Routing is handled by TanStack Router. Route components are located in the `/app/routes` directory.

## Styling

Tailwind CSS is used for styling. The main CSS file is located at `/app/styles/app.css`.

## API Routes

API routes are defined in the `/app/routes/api` directory. These routes handle server-side logic and
database operations.

## Deployment and Production

This project uses Vinxi, a powerful meta-framework for building full-stack JavaScript applications.
To deploy the application:

1. Build the project:

   ```
   npm run build
   ```

   This command uses Vinxi to build the application with the `node-server` preset, optimizing it for
   server-side rendering with a Node.js backend.

2. Start the production server:
   ```
   npm run start
   ```
   This command starts the Vinxi server in production mode, serving your built application.

### Node.js Server

The built project runs on a Node.js server, which handles both serving the static assets and
server-side rendering (SSR) of your React application. This setup provides several benefits:

- Improved initial page load times due to server-side rendering
- Better SEO as search engines can crawl the fully rendered content
- Seamless handling of both client-side and server-side routing

### Environment Variables

When running the production server, make sure to set any necessary environment variables. You can do
this by creating a `.env` file in the root of your project or by setting them directly in your
deployment environment.

### Hosting Recommendations

This Vinxi-powered application can be deployed to various Node.js-compatible hosting platforms, such
as:

- Vercel
- Netlify
- DigitalOcean App Platform
- Heroku
- AWS Elastic Beanstalk

Ensure that your chosen hosting platform supports Node.js and can run the `npm run start` command to
start the server.

### Performance Considerations

- The production build is optimized for performance, but you may want to implement additional
  caching strategies or a CDN for static assets in a high-traffic production environment.
- Monitor your application's performance and resource usage in production, and scale your server
  resources as needed.

For more detailed information on deploying Vinxi applications, refer to the
[Vinxi documentation](https://vinxi.vercel.app/guide/deployment).
