import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const USERS = [
    {
        id: '1',
        name: "ahmed",
        title: "Mr"
    },
    {
        id: '2',
        name: "Abdullah",
        title: "Mr"
    },
];


const origin = {
    origin : '*',
    optionsSuccessStatus: '200'
}
app.use(express.json());
app.use(cors(origin));

app.get('/user', (req, res) => {
    // res.setHeader("Content-Range", "bytes 0–1023/2048");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.status(200).json(USERS);
});


// app.get('/user', (req, res) => {
//     res.setHeader("Content-Range", "bytes 0–1023/2048");
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     const {firt} = req.query;
//     res.status(200).json(USERS);
// });


app.get('/user/:id', (req, res) => {
    res.setHeader("Content-Range", "user 0-24/319");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    const { id } = req.params;
    if(!id){
        id = 1;
    }
    let user = USERS.find((user) => user.id === req.params.id);

    return res.status(200).json(user);
});

app.post('/user', (req, res) => {
    res.setHeader("Content-Range", "user 0-24/319");
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id, name, title } = req.body;
    if (!id || id == null || id == "") {
        return res.status(400).json({
            message: "id is required"
        });
    }

    let user = USERS.find((user) => user.id === id);
    if(user){
        return res.status(400).json({
            data: user,
            meta: {
                "message": "User already exists"
            }
        });
    }
    let newUser = USERS.push({
        id,
        name,
        title
    });

    let lastItem = USERS[USERS.length - 1];
    console.log(lastItem);
    if (newUser) {
        res.status(201).json({
            data: lastItem,
            meta: {}
        });
    } else {
        res.status(400).json({ message: "Something went wrong" });
    }
});

app.put('/user/:id', (req, res) => {
    res.setHeader("Content-Range", "posts 0-24/319");
    res.setHeader('Access-Control-Allow-Origin', "*");
    console.log(`REQ Body : ${JSON.stringify(req.body)}`);
    const { id } = req.params;
    console.log(`[PUT] /user/${id}`);
    let user = USERS.find(user => user.id === id);

    const { name , title } = req.body;

    console.log(`REQ Body : ${req.body}`);

    user.name = name;
    user.title = title;
    
    return res.status(200).json({
        data: user,
        meta: {},
        id: user.id
    });
})

app.delete('/user/:id', (req, res) => {
    res.setHeader("Content-Range", "posts 0-24/319");

    const { id } = req.params;

    if(!id){
        id = 0;
    }
    console.log(req.params);
    let user = USERS.find(user => user.id === id);

    if (user) {
        removeObjectWithId(USERS, id);

        return res.status(200).json({ 
            id: [user.id],
            data: user,
            meta: {}
         });
    } else {
        return res.status(404).json({ 
            id: [user.id],
            data: user,
            meta: {}
         });
    }
}); 

function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);

    return arr;
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});