# Chatbot Project

A simple chatbot web app with a React front-end (Vite) and an Express back-end.

## Tech Stack

- Front-End: React + Vite
- Back-End: Node.js + Express

## Getting Started

### Back-End

1. Navigate to the back-end directory:

```bash
cd Back-End
```

2. Install dependencies:

```bash 
npm install
```

3. Start the server:

```bash
npm run start
```

The server exposes a single endpoint: /chat

### Front-End

1. Navigate to the front-end directory:

```bash
cd Front-End
```

2. Install dependencies:

```bash 
npm install
```

3. Start the server:

```bash
npm run dev
```

## Usage
Once both servers are running, open the front-end URL (usually ```http://localhost:5173``` or whatever Vite outputs) in your browser to use the chatbot.

## API

### POST /chat

**Request Body:**

```json
{
  "message": "Hello"
}
```

**Response:**

```json
{
  "reply": "Hi there! How can I help you?"
}
```
