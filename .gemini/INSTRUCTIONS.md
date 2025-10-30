# Plan de Arquitectura y Guía de Desarrollo

## 1. Objetivo de la Arquitectura

Este documento describe la arquitectura elegida para el proyecto y los pasos necesarios para configurar y ejecutar el entorno de desarrollo.

La arquitectura se basa en el principio de **Separación de Responsabilidades (Single Responsibility Principle)**, utilizando cada tecnología para lo que mejor sabe hacer:

- **Angular**: Como una **Single-Page Application (SPA)**, encargada exclusivamente de la interfaz de usuario y la experiencia en el cliente. No utilizaremos SSR por ahora para simplificar el desarrollo.
- **Express**: Como nuestra **API / Gateway**. Aunque todavía no está implementada, la arquitectura está preparada para que un servidor Express maneje la lógica de negocio, autenticación, y otras tareas de backend.
- **Nginx**: Como **Proxy Reverso**. Será la única puerta de entrada a la aplicación. Se encargará de dirigir el tráfico a la aplicación de Angular, a la API de Express y, lo más importante, actuará como un proxy dinámico para los proveedores de video externos.

## 2. Prerrequisitos

Cada desarrollador necesita tener instalado **Nginx** en su máquina local.

- **Windows (usando PowerShell/winget):**
  ```powershell
  winget install NGINX.NGINX
  ```
- **macOS (usando Homebrew):**
  ```bash
  brew install nginx
  ```
- **Linux (Debian/Ubuntu):**
  ```bash
  sudo apt-get install nginx
  ```

## 3. Guía de Configuración del Entorno

### Paso 3.1: Configuración de Nginx

Crea un archivo llamado `nginx.dev.conf` en la raíz del proyecto con el siguiente contenido. Este archivo le dirá a Nginx cómo enrutar las peticiones en nuestro entorno de desarrollo.

```nginx
# nginx.dev.conf

events {}

http {
  server {
    # Nginx será la puerta de entrada en el puerto 8080
    listen 8080;
    server_name localhost;

    # 1. Proxy para la App de Angular (servida por `nx serve`)
    location / {
      proxy_pass http://localhost:4200;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      # Necesario para que el Hot-Reloading de Angular funcione
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }

    # 2. Proxy para la futura API de Express (ej: nx serve api)
    location /api/ {
      proxy_pass http://localhost:3333/;
    }

    # 3. Proxy Reverso Dinámico para los proveedores de video
    location /proxy {
      # Nginx necesita un DNS para resolver los dominios dinámicos
      resolver 8.8.8.8; # Usamos el de Google para desarrollo

      # La magia: proxy_pass lee la URL del parámetro 'target'
      proxy_pass $arg_target;

      proxy_set_header Host $proxy_host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}
```

### Paso 3.2: Flujo de Trabajo para Ejecutar la Aplicación

Para levantar todo el entorno, necesitarás **3 terminales** en la raíz del proyecto:

1.  **Terminal 1: Iniciar Nginx**
    ```bash
    # Para macOS/Linux
    nginx -p . -c nginx.dev.conf
    # Para Windows (PowerShell)
    nginx -p $pwd.path -c nginx.dev.conf
    ```

2.  **Terminal 2: Iniciar la API de Express (para el futuro)**
    ```bash
    nx serve api
    ```

3.  **Terminal 3: Iniciar la App de Angular**
    ```bash
    nx serve streamy-player
    ```

Una vez que los tres servicios estén corriendo, accede a la aplicación en tu navegador a través de **`http://localhost:8080`**.

### Paso 3.3: Para Detener Nginx

Cuando termines de desarrollar, puedes detener el proceso de Nginx con:
```bash
nginx -p . -s stop
```
