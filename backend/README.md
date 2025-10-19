# Backend Setup

Simple Python HTTP server that stores and retrieves messages.

## How to Run

1. Start the backend server:
```bash
cd backend
python3 server.py
```

The server will start on http://localhost:8000

## API Endpoints

### POST /api/messages
Saves a message to `messages.txt`

Request body:
```json
{
  "message": "Your message here"
}
```

### GET /api/messages
Retrieves all messages from `messages.txt`

Response:
```json
{
  "messages": ["[timestamp] message1", "[timestamp] message2"]
}
```

## Files

- `server.py` - Main server file
- `messages.txt` - Auto-created file where messages are stored (one per line with timestamp)
