# Tailor Your Behavior - Standalone Android Emulator Launcher
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Tailor Your Behavior - Standalone Android Emulator    " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$sdkDir = "$env:LOCALAPPDATA\Android\Sdk"
$emuPath = "$sdkDir\emulator\emulator.exe"
$adbPath = "$sdkDir\platform-tools\adb.exe"
$apkPath = "$PSScriptRoot\app-debug.apk"
$aehdInstaller = "$PSScriptRoot\tools\aehd\silent_install.bat"

if (-not (Test-Path $emuPath)) {
    Write-Host "[ERROR] Android Emulator not found at: $emuPath" -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

# Check Hypervisor Driver (AEHD)
$aehdQuery = sc.exe query aehd 2>&1
if ($aehdQuery -match "FAILED 1060" -or $aehdQuery -match "does not exist") {
    Write-Host "[!] Android Hypervisor Driver (AEHD) needs to be installed for hardware acceleration." -ForegroundColor Yellow
    Write-Host "    A Windows permission prompt (UAC) will appear. Please click 'Yes'." -ForegroundColor Yellow
    Write-Host ""
    try {
        Start-Process -FilePath $aehdInstaller -Verb RunAs -Wait
        Start-Sleep -Seconds 2
    } catch {
        Write-Host "Failed to launch driver installer: $_" -ForegroundColor Red
    }
}

# Find AVD
$avdList = & $emuPath -list-avds
$avdName = ($avdList | Where-Object { $_ -match "\S" } | Select-Object -First 1)

if (-not $avdName) {
    Write-Host "[ERROR] No Android Virtual Device found!" -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

Write-Host "Starting Android Virtual Device: $avdName" -ForegroundColor Green
Write-Host "(Android Studio does NOT need to be open!)" -ForegroundColor Gray
Write-Host ""

# Launch emulator process detached
Start-Process -FilePath $emuPath -ArgumentList "-avd `"$avdName`" -netdelay none -netspeed full"

if (Test-Path $adbPath) {
    Write-Host "Waiting for virtual phone to boot..." -ForegroundColor Yellow
    & $adbPath wait-for-device
    
    # Wait until system boot is completed
    $bootCompleted = ""
    $retries = 0
    while ($bootCompleted -ne "1" -and $retries -lt 30) {
        Start-Sleep -Seconds 3
        $bootCompleted = (& $adbPath shell getprop sys.boot_completed 2>&1).Trim()
        $retries++
        Write-Host "." -NoNewline -ForegroundColor Yellow
    }
    Write-Host ""
    
    if (Test-Path $apkPath) {
        Write-Host "Installing Tailor Your Behavior app..." -ForegroundColor Green
        & $adbPath install -r $apkPath
        
        Write-Host "Opening Tailor Your Behavior..." -ForegroundColor Green
        & $adbPath shell monkey -p com.tailoryourbehavior.app -c android.intent.category.LAUNCHER 1 | Out-Null
        
        Write-Host ""
        Write-Host "SUCCESS! The app is now running on your emulator!" -ForegroundColor Cyan
    } else {
        Write-Host "[!] APK not found at $apkPath" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Emulator is active. You can close this console window at any time." -ForegroundColor Gray
Start-Sleep -Seconds 5
