import { app } from 'electron';
import Application from './lib/Application';

app.on('ready', () => {
    const application = new Application();
    application.load();
});
