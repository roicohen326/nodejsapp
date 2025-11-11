import 'reflect-metadata';
import { container } from 'tsyringe';
import { setupContainer } from './containerConfig';
import app from './app';
import { SERVICES } from './common/constants/services';
import { ConfigService } from './services/ConfigService';
import { Logger } from '@map-colonies/js-logger';

async function startServer(): Promise<void> {
  try {
    await setupContainer();

    const configService = container.resolve<ConfigService>(SERVICES.CONFIG);
    const logger = container.resolve<Logger>(SERVICES.LOGGER);

    const port = configService.server.port;
    const host = configService.server.host;

    app.listen(port, host, () => {
      logger.info({ port, host }, 'Server started successfully');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
