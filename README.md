# Redis 101 - Caching with Express, Node.js, and Redis

This project demonstrates a simple REST API built using **Express** and **Node.js** (v20.16.0) with **Redis** for caching. The API fetches photo data from an external API and caches the responses to reduce API calls and improve performance. The project is built with **TypeScript** for type safety.

## Features

- **Express**: For building the RESTful API.
- **Redis**: Used as a caching layer to store API responses temporarily.
- **TypeScript**: Provides static typing to ensure type safety.
- **Nodemon**: Automatically restarts the server during development.
- **CORS**: Enabled for cross-origin requests.
  
## Technologies Used

- **Node.js**: v20.16.0
- **Express**: v4.21.0
- **Redis**: v4.7.0
- **TypeScript**: v5.6.2

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/redis-101.git
cd redis-101
```

2. Install the dependencies:

```bash
npm install
```

3. Ensure you have a Redis instance running. You can install Redis locally or use a cloud-based Redis service.

4. Build the TypeScript code:

```bash
npm run build
```

5. Start the server:

```bash
# For development
npm run start:dev

# For production
npm start
```

6. Open your browser and go to `http://localhost:3000`.

## API Endpoints

The API provides the following endpoints:

### 1. Get All Photos

**GET** `/photos`

Fetches all photos or filters photos by album ID.

- **Optional Query Parameter**: `albumId`

#### Example:

```bash
GET http://localhost:3000/photos
GET http://localhost:3000/photos?albumId=1
```

### 2. Get Photo By ID

**GET** `/photos/:id`

Fetches a specific photo by its ID.

#### Example:

```bash
GET http://localhost:3000/photos/1
```

## Redis Caching

The project uses Redis to cache API responses for 1 hour (`DEFAULT_EXPIRE` set to 3600 seconds). The caching logic is implemented using the `getOrSetCache` function.

- **Key format**: 
  - For all photos: `photos?albumId={albumId}`
  - For single photo: `photos:{id}`

This ensures faster response times by avoiding redundant API requests.

## Folder Structure

```bash
├── dist              # Compiled JavaScript code (output from TypeScript)
├── src               # Source code in TypeScript
│   └── server.ts     # Main server file
├── package.json      # Project configuration and dependencies
├── request.http      # HTTP request file for testing the API
├── tsconfig.json     # TypeScript configuration file
├── .gitignore        # Gitignore configuration file
```

## Scripts

- `npm run build`: Compile TypeScript files to JavaScript.
- `npm run start`: Start the server in production mode (uses compiled JS files).
- `npm run start:dev`: Start the server in development mode with **Nodemon** for automatic restarts on code changes.

## Requirements

- **Node.js** v20.16.0
- **Redis** v4.7.0
- **TypeScript** v5.6.2