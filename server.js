const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Define a route to handle the news search
app.get('/search', async (req, res) => {
    const topic = req.query.topic;
    const apiKey = '7b921481edf0984cd4518d191e97bd356419a5977fe37dc9fef483664ff8554e';
    const apiUrl = `/search?topic=${encodeURIComponent(topic)}`; // Modified URL

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        if (data.news_results && data.news_results.length > 0) {
            res.json(data.news_results);
        } else {
            res.status(404).json({ message: 'No news articles found' });
        }
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
