"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const child_process = __importStar(require("child_process"));
const path = __importStar(require("path"));
function activate(context) {
    const openFolderCommand = vscode.commands.registerCommand('extension.openFolder', () => __awaiter(this, void 0, void 0, function* () {
        // Obtener la lista de carpetas de la configuración
        const folders = vscode.workspace.getConfiguration('openfileexplorerfolder').get('folders');
        if (!folders || folders.length === 0) {
            vscode.window.showErrorMessage('No se ha configurado ninguna carpeta para abrir.');
            return;
        }
        if (folders.length === 1) {
            // Si hay solo un directorio, abrir directamente
            openFolder(folders[0].path);
        }
        else {
            // Si hay múltiples directorios, mostrar una ventana de selección
            const selectedFolder = yield vscode.window.showQuickPick(folders.map(folder => ({
                label: folder.name || folder.path,
                description: folder.path,
                path: folder.path
            })), { placeHolder: 'Selecciona la carpeta que deseas abrir' });
            if (selectedFolder) {
                openFolder(selectedFolder.path);
            }
        }
    }));
    context.subscriptions.push(openFolderCommand);
    // Añadir un botón a la barra de estado
    const alignment = vscode.workspace.getConfiguration('openfileexplorerfolder').get('statusBarAlignment');
    const statusBarItem = vscode.window.createStatusBarItem(alignment === 'left' ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(folder)'; // Agregar un icono de carpeta
    statusBarItem.command = 'extension.openFolder';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}
function openFolder(folderPath) {
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
function deactivate() { }
