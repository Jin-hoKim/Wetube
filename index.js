import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

var app = express();

const PORT = 4000;

const handlerListener = () => console.log("listening in on : http://localhost:" + PORT);
const handleHome = (req,res) => {
    console.log("hello from home handler");
    res.send("hello from home");
}
const handleProfile = (req,res) => res.send("you r on profile"); 

// example middleware 
const betweenhome = (req, res, next ) => {
    console.log("log from function betweenhome ");
    next();
}

// middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("common"));

//app.use(betweenhome); // 모든 response 에서 middleware 'betweenhome'를 사용하겠다는 의미
// app.get("/", betweenhome, handleHome); // 루트를 통해서 접속 할 경우에만 middleware 'betweenhome'을 실행

app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(PORT, handlerListener);

// function handlerListener() {
//     console.log( 'listening in on : http://localhost:'+PORT);
// }

// function handleHome(req, res) {
//     console.log(req);
//     res.send("hello from home");
// }


// function handleProfile(req, res) {
//     res.send("you ar on my profile");
// }

