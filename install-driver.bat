@echo off
setlocal
cd /d "%~dp0"
echo ========================================================
echo   Installing Android Hypervisor Acceleration Driver
echo ========================================================
echo.
echo If prompted by Windows (UAC), click YES to allow installation.
echo.
call "%~dp0tools\aehd\silent_install.bat"
echo.
echo Checking driver status...
sc.exe query aehd
echo.
echo Done! You can now run launch-emulator.bat
pause
