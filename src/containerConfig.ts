import 'reflect-metadata';
import { container } from 'tsyringe';
import { DataSource } from 'typeorm';
import { ConfigService } from './services/ConfigService';
import { UserService } from './services/UserService';
import { UserRepository } from './repositories/UserRepository';
import { SERVICES } from './common/constants/services';
import jsLogger, { LoggerOptions } from '@map-colonies/js-logger';

export async function setupContainer(): Promise<void> {
  container.registerSingleton(SERVICES.CONFIG, ConfigService);
  
  const configService = container.resolve(ConfigService);

  const loggerConfig: LoggerOptions = {
    level: configService.logger.level,
    prettyPrint: configService.logger.prettyPrint
  };
  const logger = jsLogger(loggerConfig);
  container.registerInstance(SERVICES.LOGGER, logger);

  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.database.host,
    port: configService.database.port,
    username: configService.database.username,
    password: configService.database.password,
    database: configService.database.database,
    synchronize: configService.database.synchronize,
    logging: configService.database.logging,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migrations/**/*.ts']
  });

  await dataSource.initialize();
  container.registerInstance(SERVICES.DATA_SOURCE, dataSource);

  container.registerSingleton(SERVICES.USER_REPOSITORY, UserRepository);
  container.registerSingleton(SERVICES.USER_SERVICE, UserService);

  logger.info('Dependency Injection container initialized successfully');
}
