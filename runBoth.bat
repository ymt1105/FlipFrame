@echo off
title Warframe App Dev Launcher

echo Starting Backend Server...
start cmd /k "node backend/app.js"

echo Starting Frontend (Vite)...
start cmd /k "cd /d frontend\flipframe && npm run dev"
echo Both servers have been launched
pause