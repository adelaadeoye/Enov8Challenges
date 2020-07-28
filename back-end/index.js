require('dotenv').config();
const server = require('./api/server.js')


const PORT= process.env.PORT|| 4000;

server.listen(5003, ()=>{

    console.log(`\n ******Server is now listing on PORT ${PORT} *****`)
})