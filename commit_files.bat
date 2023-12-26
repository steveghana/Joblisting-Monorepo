@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

for /f "tokens=*" %%i in ('git ls-files') do (
    set "file=%%i"
    set "filename=!file:%cd%\=!"
     REM Get current date and time
    set "timestamp=%date:~-4%%date:~3,2%%date:~0,2%.%time:~0,2%%time:~3,2%%time:~6,2%"
    git add "%%i"
    git commit -m "Automated Commit [!timestamp] for file: !filename!"
)

git push