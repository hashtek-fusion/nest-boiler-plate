export interface EnvProperties {
    server: {
        host?: string;
        port: number;
        clusterMode: boolean;
    };
    db: {
      host: string;
      port: number;
      dbname: string;
      dbuser: string;
      dbpassword: string;
    };
    cors: {
      origin: string | string[];
    };
    jwtToken: {
      secret: string;
      algorithm?: string;
      expiresIn?: string;
    };
    multer: {
      dest: string;
    };
  }