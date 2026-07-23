#!/usr/bin/env bash
# Keep the Next.js dev server alive
cd /home/z/my-project
rm -rf .next

while true; do
  echo "[$(date)] Starting dev server..."
  npx next dev -p 3000 >> dev.log 2>&1 &
  SERVER_PID=$!
  
  # Wait for server to be ready
  for i in $(seq 1 20); do
    if ss -tlnp | grep -q ":3000 " 2>/dev/null; then
      echo "[$(date)] Server ready (PID $SERVER_PID)"
      break
    fi
    sleep 1
  done
  
  # Keep pinging to keep alive
  for i in $(seq 1 120); do
    if ! kill -0 $SERVER_PID 2>/dev/null; then
      echo "[$(date)] Server died, restarting..."
      break
    fi
    sleep 5
    # Ping the server
    node -e "require('http').get('http://127.0.0.1:3000/', () => {}).on('error', () => {})" 2>/dev/null &
  done
  
  # Clean up
  kill $SERVER_PID 2>/dev/null
  wait $SERVER_PID 2>/dev/null
  sleep 2
done