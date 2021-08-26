import { app, BrowserWindow, globalShortcut } from 'electron';
import * as path from 'path';
import { MainMessageHub } from 'simple-electron-ipc';
import address from 'address';
import robot from 'robotjs';
import { Server } from 'socket.io';
import SocketClient, { Socket } from 'socket.io-client';
import { Netmask } from 'netmask';
import axios from 'axios';

async function createWindow() {
   const mainWindow = new BrowserWindow({
      height: 300,
      width: 600,
      frame: false,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
      },
   });
   mainWindow.setMenuBarVisibility(false);
   mainWindow.setResizable(false);

   mainWindow.loadFile(path.join(__dirname, '../index.html'));

   globalShortcut.register('f5', () => mainWindow.reload());
   globalShortcut.register('f6', () => mainWindow.webContents.openDevTools());

   const ips = new Array<string>();
   new Netmask(address.ip() + '/24').forEach((ip) => ips.push(ip));
   const jobs = ips.map((ip) =>
      axios.get(`http://${ip}:11510`, { timeout: 10 })
   );
   const done = await Promise.allSettled(jobs);
   const i = done.findIndex((j) => j.status === 'fulfilled');
   const major = i < 0;

   try {
      let socketClient: Socket;
      if (!major) {
         socketClient = SocketClient(`http://${ips[i]}:11510`);
         socketClient.on('type', (key: string) => robot.keyTap(key));
      }
      let socketServer: Server<any, any, any>;
      if (major) {
         socketServer = new Server(11510);
         socketServer.on('connect', (socket) => {
            socket.on('ping', () => socket.emit('pong'));
            socket.on('type', (key: string) => robot.keyTap(key));
         });
      }
      // ['q', 'w' ,'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'z', 'x', 'c', 'v', 'b', ''].forEach(key => {
      //   major ? socketServer.sockets.send('type', key) : socketClient.emit('type', key);
      //   console.log(major, key);
      // });
      const mainMessageHub = new MainMessageHub();
      mainMessageHub.on('*', {
         setIp: () => address.ip(),
         minimize: () => mainWindow.minimize(),
         close: () => mainWindow.close(),
         type: (key: string) =>
            major
               ? socketServer.sockets.send('type', key)
               : socketClient.emit('type', key),
      });
   } catch (e) {
      console.error(e);
   }
}

app.on('ready', async () => {
   await createWindow();

   app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });
});

app.on('will-quit', () => {
   globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});
