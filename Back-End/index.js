const fs = require('fs/promises');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

let replies = [];

app.post('/chat', (req, res) => {
    if(replies.length === 0) return res.status(500);

    const message = req.body.input && typeof req.body.input === "string" ? req.body.input.toLowerCase() : "";
    const matched = [];
    
    for (const key of replies) {
        if (Array.isArray(key.messages)) {
            if (key.messages.some(d => message.includes(d.toLowerCase()))) {
                matched.push({ text: key.reply, weight: key.weight });
            }
        }
    }

    if (matched.length === 0) {
        matched.push({ text: "Sorry, I didn't catch that.", weight: 4.0 });
    }

    const uniqueMap = new Map();
    for (const item of matched) {
        if (!uniqueMap.has(item.text)) {
            uniqueMap.set(item.text, item);
        }
    }

    const uniqueReplies = Array.from(uniqueMap.values());
    uniqueReplies.sort((a, b) => b.weight - a.weight);

    const reply = uniqueReplies.map(r => r.text).join(' ');
    res.json({ reply });
});

async function loadData() {
    try {
        const file = await fs.readFile('./replies.json', 'utf8');
        replies = JSON.parse(file);
        console.log("Replies loaded:", replies.length);
    } catch (e) {
        console.error("Failed to load replies.json:", e.message);
        process.exit(1);
    }
}

app.listen(PORT, async () => {
    await loadData();
    console.log(`Server running on port ${PORT}`);
});