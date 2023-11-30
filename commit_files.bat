@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

REM Iterate through all files in the directory and its subdirectories
for /r %%i in (*) do (
    git add "%%i"
    git commit -m "Batch Committing file: %%i"
)

git push
