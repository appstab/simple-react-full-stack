const express = require('express');
const os = require('os');
const cookieParser = require('cookie-parser')


const app = express();

const accessToken = "ABCDEFGH";

app.use(cookieParser());

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/getToken', (req, res) => {

    // Set a cookie
    res.cookie('myCookie', accessToken, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        // secure: true,
        sameSite: true,
    })

    res.send({ isSuccess: true });

})

app.get('/api/triviaPoints', (req, res) => {
    console.log("req cookie", req.cookies);
    if (req.cookies && req.cookies.myCookie === accessToken) {
        res.send([{ name: 'Ang', score: 17 }, { name: 'Olly', score: 16 }])
    } else {
        res.status(401).send('ooops')
    }
})



app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
