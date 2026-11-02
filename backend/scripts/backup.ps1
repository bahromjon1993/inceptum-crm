# Automated PowerShell Database Backup Script for Inceptum CRM
# Scheduled via Windows Task Scheduler or cron
$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Split-Path -Parent $scriptDir

Write-Host "Starting Inceptum Database Backup..." -ForegroundColor Cyan

Set-Location $backendDir
& ".\venv\Scripts\python.exe" manage.py backup_db --tag automated

# Clean up backups older than 14 days
$backupDir = "$backendDir\backups"
$limitDate = (Get-Date).AddDays(-14)
Get-ChildItem -Path $backupDir -Filter "inceptum_db_*.sql" | Where-Object { $_.CreationTime -lt $limitDate } | Remove-Item -Force

Write-Host "Backup job completed successfully." -ForegroundColor Green
