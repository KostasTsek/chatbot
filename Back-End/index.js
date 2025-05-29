const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post('/chat', (req, res) => {
    const replies = [`I’m Kostas, a computer science student passionate about web development, with a strong curiosity for low-level systems and how things work under the hood. I enjoy building robust web applications while also exploring the fundamentals of programming and networks. I’m eager to grow my web dev skills and contribute to impactful projects.`,
        `I have worked on several projects, including a custom shell implementation, a micro TCP service, a Formula 1 VR game, and an unfinished website for local postings that was eventually scrapped. These experiences have strengthened my skills across systems programming, network programming, game development, and web technologies.`,
        `I am skilled in programming languages like C, JavaScript, and Python, as well as in systems programming, network communication, backend development, and practical problem-solving. I’m comfortable working with both low-level code and high-level web technologies.`,
        'I am a student in the Computer Science Department of University Of Crete.',
        'Outside of computer science, I enjoy skiing during the winter, as well as drawing and playing the bouzouki.',
        "I am from Alexandria, Imathia, Greece. Currently studying in Herakleion.",
        'Hi there!',
        'Goodbye! Feel free to ask me anything anytime.'
    ];
    
    const mappings = {
        'name': {text: replies[0], weight: 3.0},
        'about yourself': {text: replies[0], weight: 3.0},
        'who are you': {text: replies[0], weight: 3.0},
        'projects': {text: replies[1], weight: 2.0},
        'worked on': {text: replies[1], weight: 3.0},
        'past work': {text: replies[1], weight: 3.0},
        'exprerience': {text: replies[2], weight: 2.0},
        'skills': {text: replies[2], weight: 2.0},
        'expertise': {text: replies[2], weight: 2.0},
        'study': {text: replies[3], weight: 2.0},
        'education': {text: replies[3], weight: 2.0},
        'hobbies': {text: replies[4], weight: 2.0},
        'interests': {text: replies[4], weight: 2.0},
        'where': {text: replies[5], weight: 2.0},
        'from': {text: replies[5], weight: 2.0},
        'residence': {text: replies[5], weight: 2.0},
        'hi': {text: replies[6], weight: 4.0},
        'hello': {text: replies[6], weight: 4.0},
        'bye': {text: replies[7], weight: 0.0},
        'goodbye': {text: replies[7], weight: 0.0}  
    };

    const message = req.body.input?.toLowerCase() || "";
    const matched = [];

    /* Finding all matches and pushing them to matched. */
    for(const key in mappings){
        if(message.includes(key))
            matched.push(mappings[key]);
    }

    if(matched.length === 0)
        matched.push({text:"Sorry, I didn't catch that.", weight: 4.0});

    /* Filtering out double matches. */
    const uniqueMap = new Map();
    for (const item of matched) {
        if (!uniqueMap.has(item.text)) {
        uniqueMap.set(item.text, item);
        }
    }
    const uniqueReplies = Array.from(uniqueMap.values());

    /* Sorting by weight for more natural responses. */
    uniqueReplies.sort((a, b) => b.weight - a.weight);

    /* Join all elements of uniqueReplies to a string. */
    const reply = uniqueReplies.map(r => r.text).join(' ');
    res.json({reply: reply});
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
