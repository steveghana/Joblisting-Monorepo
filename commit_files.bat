@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

for /f "tokens=*" %%i in ('git status --porcelain --ignored ^| findstr "^??"') do (
    set /p commitMessage=Enter the commit message for "%%i": 

    git add "%%i"
    git commit -m "!commitMessage!" "%%i"
)

git push
