const express = require('express')
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());
const employeeDataBase = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'Beats98.',
    database:'employee_system'

});

app.post('/create',(req, res) =>{
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const position = req.body.position
    const salary = req.body.salary

    employeeDataBase.query('INSERT INTO employees (firstname, lastname, email, position, salary) VALUES(?,?,?,?,?)',
    [firstName, lastName, email, position, salary], 
    (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("values inserted");
        }
    });
})

app.get('/employees', (req, res) =>{
    employeeDataBase.query("SELECT * FROM employees", (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
});

app.listen(3001, ()=>{
    console.log("Message Recieved!");
});