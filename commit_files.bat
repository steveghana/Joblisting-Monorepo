@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

for %%i in (*) do (
    git add "%%i"
    git commit -m "Batch Committing file: %%i"
)

git push
