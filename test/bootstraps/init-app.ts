export default () => {
  return {
    db: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      name: process.env.DATABASE_NAME || 'hahow',
      username: process.env.DATABASE_USERNAME || 'hahow',
      password: process.env.DATABASE_PASSWORD || '12345',
    },
  };
};
