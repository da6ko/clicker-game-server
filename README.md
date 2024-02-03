# Clicker Game Server
This server is designed to handle data storage and retrieval for a clicker game. The server is implemented using Node.js, Express.js, and MongoDB for data storage. It provides endpoints for saving and loading game data, allowing the game client to persistently store player progress.

# Installation
Make sure you have the following installed before setting up the server:

- Node.js
- MongoDB or MongoDB Atlas

1. Clone the repository: 

```bash
git clone https://github.com/da6ko/clicker-game-server
```

2. Install dependencies: 

```bash
npm install
```

3. Set up MongoDB connection:
- Create a MongoDB database / MongoDB Atlas database
- Replace the MONGO_URI in the server.js file with your MongoDB connection string.

4. Start the server: 
```bash
npm start
```

# Usage
This server is intended to be used as the backend for a clicker game. The game client communicates with the server to save and load game data, ensuring that players can continue their progress across sessions.

# API Endpoints
1. Save Game Data
- Endpoint: '/api/save-game-data'
- Method: POST
- Response: JSON with the updated game data.

2. Load Game Data
- Endpoint: '/api/load-game-data'
- Method: GET
- Response: JSON with the latest game data. If no data exists, default game data is created and returned