const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const IndexRoutes = require('./routes/index')



//----------------------------------------livereoad
/* const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 10);
}); */
//------------------------------------

//setting
app.set('port',process.env.PORT || 3000)
/* app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
//static files
 */
app.use(express.static(path.join(__dirname,'public')))

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//mio------------------------------
// app.use(connectLivereload());
//---------------------------------

//routes
app.use(IndexRoutes)

//starting the server
app.listen(app.get('port'),()=>{
    console.log(`server on http://localhost:${app.get('port')}`)
})