@echo off
title Warframe Setup File

echo Creating dependencies required to run server...
start cmd /c "node backend/setup/getJWT"
start cmd /c "node backend/setup/createLookupFile"
start cmd /c "echo 5|node backend/setup/createRelicBreakdown"

echo Successfully ran setup files