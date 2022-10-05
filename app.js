import express from 'express';
import * as dotenv from 'dotenv';

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

app.use(express.json());

app.get('/user', (req ,res) => {
    res.setHeader("Content-Range", "user 0-24/319");
    res.status(200).json(USERS);
});

app.post('/user' , (req ,res) => {
    res.setHeader("Content-Range", "user 0-24/319");
    const { id , name , title } = req.body;
    if(!req.body || !req.body) {
        return res.status(400).json({});
    }
    let newUser = USERS.push({
        id,
        name,
        title
    });

    console.log(newUser);
    if(newUser){
        res.status(201).json({message: "User Created"});
    }else{
        res.status(400).json({message: "Something went wrong"});
    }
});

app.put('/user' , (req ,res ) => {
    res.setHeader("Content-Range", "posts 0-24/319");
    
    const { id } = req.query;
    console.log(req.params);
    let user = USERS.find(user => user.id === id);

    user.name = req.body.name;
    user.title = req.body.title;

    USERS.push(user);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    return res.status(404).json(user);
})

app.delete('/user' , (req ,res ) => {
    res.setHeader("Content-Range", "posts 0-24/319");
    
    const { id } = req.query;
    console.log(req.params);
    let user = USERS.find(user => user.id === id);

    if(user){
        removeObjectWithId(USERS , id);

        return res.status(200).json({message: "User Deleted"});
    }else{
        return res.status(404).json({message: "User not found"});
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