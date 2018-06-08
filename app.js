import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import db from './models/db';
import route from './routes';
import admin from './routes/admin';
import i18n from './models/i18n';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', route);
app.use('/admin', admin);

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`服务正在${server.address().port}端口启动`);
  }
});


export default app;