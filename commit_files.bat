@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

for /f "tokens=*" %%i in ('git status --porcelain') do (
    set "file=%%i"
    set "filename=!file:..=!"
    
    git add "%%i"
    git commit -m "Batch Committing file: update !filename!"
)

git push
