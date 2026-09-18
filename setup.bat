@echo off
title Warframe Setup File

echo Creating dependencies required to run server...
start cmd /c "node backend/setup/getJWT"
start cmd /c "node backend/setup/createLookupFile"
timeout /t 5 /nobreak
start cmd /c "node backend/setup/createRelicBreakdown"

echo Successfully ran setup files