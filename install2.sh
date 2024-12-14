#!/bin/bash

# Detener la ejecución si ocurre un error
set -e

echo "Descargando node_modules.tar.gz..."
curl -L -o node_modules.tar.gz https://github.com/elrebelde21/NovaBot_MD/releases/download/1.1.8/node_modules.tar.gz

echo "Extrayendo node_modules..."
tar -xzf node_modules.tar.gz

# Eliminar el archivo comprimido después de extraerlo
rm node_modules.tar.gz

echo "Verificando dependencias adicionales..."
npm install

echo "Iniciando el bot..."
npm start
