#!/bin/bash
# Double-click to run the Nirvon portfolio at http://localhost:8000
cd "$(dirname "$0")"
PORT=8000
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT+1)); done
echo ""
echo "  Nirvon portfolio running at:  http://localhost:$PORT"
echo "  Keep this window open. Press Ctrl+C (or close the window) to stop."
echo ""
(sleep 1; open "http://localhost:$PORT") &
python3 -m http.server $PORT
