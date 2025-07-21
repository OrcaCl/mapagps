#!/bin/bash

#Nombre del proyecto actual (carpeta donde lo ejecuto)
PROJECT_NAME=$(basename "$PWD")

#Timestamp legible
DATE=$(date +"%Y-%m-%d_%H-%M")

#Nombre del archivo final de respaldo
BACKUP_NAME="backups/backup-${PROJECT_NAME}-${DATE}.tar.gz"

#Crear backup excluyendo carpetas pesadas e innecesarias
tar --exclude='.node_modules' \
    --exclude='./.git' \
    --exclude='./dist' \
    --exclude='*.tar*' \
    --exclude='./backups' \
    -czvf "$BACKUP_NAME" ./

echo " "
echo "✅ Backup creado: $BACKUP_NAME"
echo "📁 Ubicación: $(pwd)/$BACKUP_NAME"

#No olvidar darle permisos de ejecucion en consola con 
# chmod +x backup-branch.sh
