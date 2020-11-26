import Redis from './utils/redis';

// clean invalid keys (every day)
setInterval(async () => {
    await Redis.cleanKeys();
}, 86400000);