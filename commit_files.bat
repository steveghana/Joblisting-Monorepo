@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

for /f "tokens=*" %%i in ('git ls-files') do (
    set "file=%%i"
    set "filename=!file:%cd%\=!"
    
    git add "%%i"
    git commit -m "Automated Commit file: _update !filename!"
)

git push
