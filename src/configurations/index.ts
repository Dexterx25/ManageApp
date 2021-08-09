import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

export let config :any  = {
    api:{
        host:process.env.API_HOST || 'localhost',
        port:process.env.API_PORT || 3000
    },
    jwt:{
        secret:process.env.SECRET || "SECRETTOKEN"
    },
    database:{
        user: process.env.DB_USER_PSQL || 'developuser',
        host: process.env.DB_HOST_PSQL || 'localhost',
        database:process.env.DB_NAME || 'developdbpsql',
        password:process.env.DB_PASS || 'passcode',
        port:process.env.DB_PORT ||  5432
    },
    MSV_PSQL:{
        host:process.env.DB_PSQL_HOST || 'localhost',
        port:process.env.PSQL_MSV || 3001      
    },
    redis:{
        host: process.env.REDIS_SRV_HOST || '127.0.0.1',
        port: process.env.REDIS_SRV_PORT || 6379,
       //pasword: process.env.REDIS_SRV_PORT  || 'q6mUvhd8y7539z+yMGFnQetknyTPhmQvlgaIwrxDjKojljEjNhKQY72Tpmc2PyD02VbamA7B2GcPtyDar'
    },
    cacheService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3002,
    }, 
}

 