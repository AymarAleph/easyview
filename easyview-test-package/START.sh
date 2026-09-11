#!/bin/bash

cd "$(dirname "$0")/dist"

echo ""
echo "========================================"
echo "  easyview - SYSCOHADA Accounting App"
echo "========================================"
echo ""
echo "Starting local server on http://localhost:8000"
echo "Press Ctrl+C to stop"
echo ""

# Try Python 3
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Try Python 2
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
# Try Node.js http-server
elif command -v npx &> /dev/null; then
    npx http-server -p 8000
else
    echo "Error: Please install Python or Node.js to run this server"
    exit 1
fi
