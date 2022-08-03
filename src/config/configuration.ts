export default () => {
  console.log(process.env.DATABASE_PASSWORD);
  return {
    db: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      name: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
  };
};
