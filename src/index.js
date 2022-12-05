import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', 'src/resource/views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log(`Listening at http://localhost:${port}`);
});