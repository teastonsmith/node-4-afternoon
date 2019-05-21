// required packages at the top of file
require('dotenv').config();
const express = require('express');
const session = require('express-session');

// require the checkForSession middleware
const checkForSession = require('./middlewares/checkForSession');
// require the swag controller
const swagController = require('./controllers/swagController');
// require the auth controller
const authController = require('./controllers/authController');
// require the cart controller
const cartController = require('./controllers/cartController');
//require the search controller
const searchController = require('./controllers/searchController');

const app = express();

// destructuring SERVER_PORT and SESSION_SECRET from process.env
const { SERVER_PORT, SESSION_SECRET } = process.env;

// top-level middleware
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	}),
);
app.use(checkForSession);
// middleware to use express.static to serve up the build folder in /build
app.use(express.static(`${__dirname}/../build`));

// endpoints
// auth
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);
// swag
app.get('/api/swag', swagController.read);
// cart
app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart/:id', cartController.add);
app.delete('/api/cart/:id', cartController.delete);
// search
app.get('/api/search', searchController.search);

app.listen(SERVER_PORT, () => {
	console.log(`Server is listening on ${SERVER_PORT}`);
});
