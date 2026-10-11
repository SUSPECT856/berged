@echo off
chcp 65001 >nul
cd /d "%~dp0"
title BERGED AI Remote
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 server.py
) else (
  python server.py
)
echo.
echo BERGED AI Remote kapandi. Hata mesaji varsa yukarida gorunur.
pause
