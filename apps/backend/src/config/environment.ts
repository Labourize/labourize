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
          contractAddress: process.env.CONTRACT_ADDRESS,
          privateKey: process.env.PRIVATE_KEY
      },
      jwt: {
        public: process.env.JWT_PUBLIC || 'Jwt Public default',
        secret: process.env.JWT_SECRET || 'Jwt Secret default',
        algorithm: process.env.JWT_ALGORITHM || 'RS256',
        ttl: ((process.env.JWT_TTL as unknown) as number) || 28800
      }
  }
}
