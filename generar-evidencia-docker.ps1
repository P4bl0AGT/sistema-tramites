$salida = "otros/evidencia-docker.md"
$fecha = Get-Date -Format "yyyy-MM-dd HH:mm"

"# Evidencia de despliegue Docker — Entrega Final" | Out-File $salida -Encoding utf8
"" | Out-File $salida -Append
"Fecha de ejecucion: $fecha" | Out-File $salida -Append
"" | Out-File $salida -Append

Write-Host "Levantando servicios..." -ForegroundColor Cyan
docker compose down -v 2>&1 | Out-Null
docker compose up --build -d 2>&1 | Tee-Object -Variable buildOut | Out-Null

"## docker compose up --build -d" | Out-File $salida -Append
"" | Out-File $salida -Append
'```' | Out-File $salida -Append
$buildOut | Out-File $salida -Append
'```' | Out-File $salida -Append
"" | Out-File $salida -Append

Start-Sleep -Seconds 10

"## docker compose ps" | Out-File $salida -Append
"" | Out-File $salida -Append
'```' | Out-File $salida -Append
docker compose ps 2>&1 | Tee-Object -Variable psOut | Out-File $salida -Append
'```' | Out-File $salida -Append
"" | Out-File $salida -Append

"## Health check API" | Out-File $salida -Append
"" | Out-File $salida -Append
'```' | Out-File $salida -Append
try {
    $health = Invoke-RestMethod http://localhost:3001/api/health
    $health | ConvertTo-Json | Out-File $salida -Append
} catch {
    "Error al conectar con la API: $_" | Out-File $salida -Append
}
'```' | Out-File $salida -Append

Write-Host "Evidencia guardada en $salida" -ForegroundColor Green
Write-Host "Frontend disponible en http://localhost:8100" -ForegroundColor Green
Write-Host "API disponible en http://localhost:3001/api/health" -ForegroundColor Green
