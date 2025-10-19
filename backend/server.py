from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os
from datetime import datetime

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_POST(self):
        if self.path == '/api/messages':
            # Read the message from the request
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            message_data = json.loads(post_data.decode('utf-8'))

            # Save message to text file
            with open('messages.txt', 'a') as f:
                timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                f.write(f"[{timestamp}] {message_data.get('message', '')}\n")

            self._set_headers(201)
            response = {'status': 'success', 'message': 'Message saved'}
            self.wfile.write(json.dumps(response).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'error': 'Not found'}).encode())

    def do_GET(self):
        if self.path == '/api/messages':
            # Read messages from text file
            messages = []
            if os.path.exists('messages.txt'):
                with open('messages.txt', 'r') as f:
                    messages = f.readlines()

            self._set_headers()
            response = {'messages': [msg.strip() for msg in messages]}
            self.wfile.write(json.dumps(response).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'error': 'Not found'}).encode())

def run(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()

# 1. grab in variable
# 2. write a new variable 