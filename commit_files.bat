@echo off

for /r %%i in (*) do (
    git add "%%i"
   
    git commit -m "Batch Committing file:update %%i"

)

git push
