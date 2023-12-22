@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

REM Prompt the user for a commit message
set /p commitMessage=Enter the commit message: 

for /f "tokens=*" %%i in ('git ls-files') do (
    set "file=%%i"
    set "filename=!file:%cd%\=!"

    git add "%%i"
    git commit -m "!commitMessage!"
)

git push
