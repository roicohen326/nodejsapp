import { injectable } from 'tsyringe';
import config from 'config';
import { IConfig, IDatabaseConfig, IServerConfig, ILoggerConfig } from '../common/interfaces/IConfig';

@injectable()
export class ConfigService implements IConfig {
  public get server(): IServerConfig {
    return config.get<IServerConfig>('server');
  }

  public get database(): IDatabaseConfig {
    return config.get<IDatabaseConfig>('database');
  }

  public get logger(): ILoggerConfig {
    return config.get<ILoggerConfig>('logger');
  }

  public get<T>(key: string): T {
    return config.get<T>(key);
  }

  public has(key: string): boolean {
    return config.has(key);
  }
}
