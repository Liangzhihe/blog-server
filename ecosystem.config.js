// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: "blog-server",
      script: "dist/server.js",
      exec_mode: "fork", // cluster or fork
      instances: "1", // number of instances
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
