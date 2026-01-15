import "reflect-metadata";
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { 
    initializeDatabase, 
    createCustomer, 
    getAllCustomers, 
    updatePoints, 
    getCustomerHistory,
    deleteCustomer
} from './database';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // In der Entwicklung laden wir von Vite, in Produktion die gebaute Datei
    if (!app.isPackaged && process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:5173');
    } else {
        const htmlPath = path.resolve(__dirname, '..', 'renderer', 'index.html');
        win.loadFile(htmlPath).catch(err => {
            console.error('Failed to load file:', err);
            // Fallback falls der Pfad in der gebauten Version anders ist
            const fallbackPath = path.join(app.getAppPath(), 'dist', 'renderer', 'index.html');
            return win.loadFile(fallbackPath);
        });
    }
}

// IPC Handlers
ipcMain.handle('customer:create', async (event, data) => {
    return await createCustomer(data);
});

ipcMain.handle('customer:getAll', async (event, searchTerm?: string) => {
    return await getAllCustomers(searchTerm);
});

ipcMain.handle('customer:updatePoints', async (event, customerId, amount, reason) => {
    return await updatePoints(customerId, amount, reason);
});

ipcMain.handle('customer:getHistory', async (event, customerId) => {
    return await getCustomerHistory(customerId);
});

ipcMain.handle('customer:delete', async (event, customerId) => {
    return await deleteCustomer(customerId);
});

app.whenReady().then(async () => {
    await initializeDatabase();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})