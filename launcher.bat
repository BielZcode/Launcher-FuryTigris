@echo off
cd /d "%~dp0"
java -Djava.library.path="%~dp0natives" -cp "%~dp0minecraft.jar;%~dp0libraries\*" net.minecraft.client.main.Main --accessToken 000 --version 1.8.8
pause
