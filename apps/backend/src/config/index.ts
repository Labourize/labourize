export default () => {
  return {
      port: process.env.PORT,
      db: {
          host: process.env.POSTGRES_HOST,
          port: process.env.POSTGRES_PORT,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB
      },
      connectionDetails: {
          providerUrl: process.env.PROVIDER_URL,
          apiKey: process.env.API_KEY,
          privateKey: process.env.PRIVATE_KEY
      }
  }
}
