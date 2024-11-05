import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const openFolderCommand = vscode.commands.registerCommand('extension.openFolder', async () => {
        // Obtener la lista de carpetas de la configuración
        const folders = vscode.workspace.getConfiguration('openfileexplorerfolder').get('folders') as Array<{ path: string, name?: string }>;

        if (!folders || folders.length === 0) {
            vscode.window.showErrorMessage('No se ha configurado ninguna carpeta para abrir.');
            return;
        }

        if (folders.length === 1) {
            // Si hay solo un directorio, abrir directamente
            openFolder(folders[0].path);
        } else {
            // Si hay múltiples directorios, mostrar una ventana de selección
            const selectedFolder = await vscode.window.showQuickPick(
                folders.map(folder => ({
                    label: folder.name || folder.path,
                    description: folder.path,
                    path: folder.path
                })),
                { placeHolder: 'Selecciona la carpeta que deseas abrir' }
            );

            if (selectedFolder) {
                openFolder(selectedFolder.path);
            }
        }
    });

    context.subscriptions.push(openFolderCommand);

    // Añadir un botón a la barra de estado
    const alignment = vscode.workspace.getConfiguration('openfileexplorerfolder').get('statusBarAlignment') as string;
    const statusBarItem = vscode.window.createStatusBarItem(alignment === 'left' ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(folder)'; // Agregar un icono de carpeta
    statusBarItem.command = 'extension.openFolder';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}

function openFolder(folderPath: string) {
    const fullPath = path.resolve(folderPath);
    child_process.exec(`explorer "${fullPath}"`, (err, stdout, stderr) => {
        if (err) {
            // Solo mostrar un mensaje si hay un error diferente de 0
            if (stderr) {
                vscode.window.showErrorMessage(`Error al abrir la carpeta: ${stderr}`);
            }
        }
    });
}

export function deactivate() {}