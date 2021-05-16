import app from './app';
import db from './database';
(async ()=>{
    await app.listen(3000);
    console.log('Server on port: 3000');
})()