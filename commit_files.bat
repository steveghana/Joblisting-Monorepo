@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

for /f "tokens=*" %%i in ('git ls-files') do (
    git add "%%i"
    git commit -m "Batch Committing file: %%i"
)

git push
