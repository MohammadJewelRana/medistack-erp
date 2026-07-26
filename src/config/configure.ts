export default () => ({
  port: parseInt(process.env.PORT ?? '5000', 10),
  databaseUrl: process.env.DATABASE_URL,

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'fallback_access_secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret',
    accessExpires: Number(process.env.JWT_ACCESS_EXPIRES) || 900,
    refreshExpires: Number(process.env.JWT_REFRESH_EXPIRES) || 604800,
  },
});
