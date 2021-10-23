const express = require('express');
const path = require('path');
const app = express();
const port = 3005;
const session = require('express-session');

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
// Routes
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

const middleware = require('./middleware');
app.use(middleware.logger('dev'));

const server = app.listen(port, () => {
    console.log('connection succesfully on port', port);
} );

// socket io
const ServerIO = require('socket.io');
const io = new ServerIO.Server(server);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('dw_message', (data) => {
        console.log('message from client', data);
    });
    socket.on('dw_message', (data) => {
        io.emit('dw_message', data);
    });
});

// middlewares
app.get('/',(req, res, next) => {
    res.redirect('/home');
});

app.get('/home', middleware.validateAuth, (req, res, next) => {
    const payload = {
        name: 'Gabriel'
    };
    res.status(200).render('home', payload);
});

app.get('/socketio', (req, res, next) => {
    res.status(200).render('socketio');
})