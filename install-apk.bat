@echo off
echo ========================================================
echo   Install Tailor Your Behavior APK via ADB
echo ========================================================
echo.

set SDK_ADB=%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe
set APK_PATH=%~dp0app-debug.apk

if not exist "%SDK_ADB%" (
    where adb.exe >nul 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] ADB not found. Make sure emulator or phone is connected.
        pause
        exit /b 1
    )
    set SDK_ADB=adb
)

echo Checking connected devices / emulators...
"%SDK_ADB%" devices
echo.

echo Installing %APK_PATH%...
"%SDK_ADB%" install -r "%APK_PATH%"

echo Launching app...
"%SDK_ADB%" shell monkey -p com.tailoryourbehavior.app -c android.intent.category.LAUNCHER 1

echo.
echo Done!
pause
