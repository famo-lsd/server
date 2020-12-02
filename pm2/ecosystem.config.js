module.exports = {
  apps: [{
    name: 'Server - Node.js',
    cwd: 'C:/FAMO_NODE/Server/dist/',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },
  {
    name: 'Database - Redis',
    cwd: 'C:/FAMO_NODE/Server/dist/',
    script: 'clean.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
