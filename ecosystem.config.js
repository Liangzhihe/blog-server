// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: "blog-server",
      script: "dist/server.ts",
      exec_mode: "cluster",
      instances: "max",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
