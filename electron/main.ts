import { app } from 'electron';
import Application from './lib/Application';

app.on('ready', async () => {
    const application = new Application();
    await application.load();
});
