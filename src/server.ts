import express, { Request } from 'express';
import cors from 'cors';
import { createClient } from 'redis';

// Create a new application
const app = express();

// Create redis client instance
const redisClient = createClient();

// Connect to Redis
(async () => {
    await redisClient.connect();
    console.log('🟥 Connected to Redis');
})();

// Handle connection errors
redisClient.on('error', (err) => console.error('Redis Client Error', err));


// Enable CORS for all requests
app.use(cors());

const photosAPI = "https://jsonplaceholder.typicode.com/photos";
const DEFAULT_EXPIRE = 3600;

// Get all photos
app.get('/photos', async (req, res) => {
    const { albumId } = req.query;
    // Check if photos are cached in Redis before making a request to the API

    const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
        const response = await fetch(`${photosAPI}${albumId ? `?albumId=${albumId}` : ''}`);
        const data = await response.json();

        if (!data.length) {
            return res.json({ message: "No photos" });
        }

        return data;
    });

    return res.json(photos);
});

// Get photo by id
app.get('/photos/:id', async (req: Request, res) => {
    const id = parseInt(req.params.id);
    const photo = await getOrSetCache(`photos:${id}`, async () => {
        const response = await fetch(`${photosAPI}/${id}`);
        const data = await response.json();

        if (!data) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        return data;
    });

    return res.json(photo);
});

async function getOrSetCache(key: string, cb: () => Promise<Record<string, any>>): Promise<Record<string, any>> {
    try {
        const data = await redisClient.get(key);

        if (data) return JSON.parse(data);

        const freshData = await cb();
        redisClient.setEx(key, DEFAULT_EXPIRE, JSON.stringify(freshData));
        return freshData;
    } catch (err) {
        return err;
    }
}

app.listen(3000, () => {
    console.log('🚀 Server is running on port 3000');
});