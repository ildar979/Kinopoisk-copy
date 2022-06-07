require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bcrypt = require('bcrypt');
const { User, Movie } = require('./db/models');
const async = require('hbs/lib/async');
const FileStore = require('session-file-store')(expressSession);
const { sequelize } = require('./db/models');

const app = express();
app.use(cors());
const PORT = process.env.PORT ?? 3000;

const sessionConfig = {
  store: new FileStore(),
  secret: 'keyboard cat',
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: true,
};

app.set('view engine', 'hbs'); // задаем движок для генерации шаблонов
app.set('views', path.join(__dirname, 'views')); // указываем путь до нашей папки views
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession(sessionConfig));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const films = await Movie.findAll();
  res.render('index', {
    isAuthorized: req.session.isAuthorized,
    name: req.session.user?.name,
    films,
  });
});

app.get('/reg', (req, res) => {
  res.render('registr');
});

app.post('/reg', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    req.session.user = user;
    req.session.isAuthorized = true;
  } catch (error) {
    res.render('error', { error: error.message });
  }
  return res.redirect('/');
});

app.get('/login', (req, res) => {
  res.render('auth');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    req.session.isAuthorized = true;
    res.redirect('/');
    // res.send(`Добро пожаловать ${user.name}`);
  } else {
    res.send('Неправильный логин или пароль');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/pers', async (req, res) => {
  const { id } = req.session.user;
  const user = await User.findByPk(id);
  res.render('pers', { user });
});

app.get('/premier', (req, res) => {
  res.render('premier');
});

app.get('/movieInfo/:id', (req, res) => {
  res.render('movieInfo');
});

app.listen(PORT, async () => {
  console.log(`Запуск сервера на ${PORT} порту`);
  try {
    await sequelize.authenticate(); // метод для проверки подключения к базе данных
    console.log('Успешное подключение к БД');
  } catch (error) {
    console.log('Не удалось подключиться к БД');
    console.log(error.message);
  }
});
