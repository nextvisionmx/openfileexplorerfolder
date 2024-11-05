# Open File Explorer Folder

Esta extensión para Visual Studio Code permite abrir rápidamente carpetas específicas en el explorador de archivos del sistema directamente desde la barra de estado de VS Code.

## Características

- **Soporte para múltiples carpetas**: puedes definir varias rutas de carpetas en la configuración de la extensión y seleccionar cuál abrir.
- **Configuración de nombre personalizado**: asigna un nombre personalizado a cada carpeta para identificarla fácilmente en el menú de selección.
- **Posicionamiento en la barra de estado**: elige entre `left` o `right` para colocar el botón de acceso en la barra de estado.

## Configuración

Agrega las carpetas que deseas abrir en el archivo `settings.json` de VS Code. Puedes configurarlas siguiendo este ejemplo:

```json
"openfileexplorerfolder.folders": [
    {
        "path": "C:/Users/YourUser/Documents/Project1",
        "name": "Proyecto 1"
    },
    {
        "path": "D:/Work/Files",
        "name": "Archivos de Trabajo"
    },
    {
        "path": "E:/Backups"
    }
],
"openfileexplorerfolder.statusBarAlignment": "left"
