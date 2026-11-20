@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo   Tailor Your Behavior - Standalone Android Emulator
echo ========================================================
echo.

set SDK_EMU=%LOCALAPPDATA%\Android\Sdk\emulator\emulator.exe
set SDK_ADB=%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe
set APK_PATH=%~dp0app-debug.apk

if not exist "%SDK_EMU%" (
    echo [ERROR] Android Emulator not found at:
    echo "%SDK_EMU%"
    echo.
    echo Please open Android Studio once and complete the setup wizard
    echo to download the Android Virtual Device (AVD).
    echo.
    pause
    exit /b 1
)

echo Finding available virtual devices (AVDs)...
for /f "tokens=*" %%i in ('"%SDK_EMU%" -list-avds') do (
    set AVD_NAME=%%i
    goto :found_avd
)

:found_avd
if "%AVD_NAME%"=="" (
    echo [ERROR] No Virtual Device found!
    echo Open Android Studio once -^> Device Manager -^> Create Device (e.g. Pixel 8).
    pause
    exit /b 1
)

echo Starting Virtual Device: %AVD_NAME%...
echo (Android Studio does NOT need to be open!)
echo.

start "" "%SDK_EMU%" -avd %AVD_NAME% -netdelay none -netspeed full

echo Waiting for emulator to boot up...
if exist "%SDK_ADB%" (
    "%SDK_ADB%" wait-for-device
    echo Emulator detected! Installing app-debug.apk...
    timeout /t 10 /nobreak >nul
    "%SDK_ADB%" install -r "%APK_PATH%"
    echo Launching Tailor Your Behavior app...
    "%SDK_ADB%" shell monkey -p com.tailoryourbehavior.app -c android.intent.category.LAUNCHER 1
    echo.
    echo SUCCESS! App is now running on your standalone emulator.
)

pause
