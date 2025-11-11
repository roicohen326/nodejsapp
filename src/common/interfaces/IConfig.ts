export interface IServerConfig {
  port: number;
  host: string;
}

export interface IDatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export interface ILoggerConfig {
  level: string;
  prettyPrint: boolean;
}

export interface IConfig {
  server: IServerConfig;
  database: IDatabaseConfig;
  logger: ILoggerConfig;
}
