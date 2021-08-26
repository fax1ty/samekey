import { RendererMessageHub } from 'simple-electron-ipc';

const rendererMessageHub = new RendererMessageHub();

rendererMessageHub.emit('setIp').then((ip: string) => {
   const ipText = document.getElementById('ip');
   ipText.textContent = `IP: ${ip}`;
});

const minimize = document.getElementById('minimize');
minimize.addEventListener('click', () => rendererMessageHub.emit('minimize'));
const close = document.getElementById('close');
close.addEventListener('click', () => rendererMessageHub.emit('close'));
