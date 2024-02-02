const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'malharsql31',
  database: 'dbms_project'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.json("Backend accessible through port: 8801")
})

app.post('/getPrice', (req, res) => {
  const { company, bodytype, fromcity, tocity } = req.body;

  const sql = `SELECT price FROM information WHERE company = '${company}' AND bodytype = '${bodytype}' AND fromcity = '${fromcity}' AND tocity = '${tocity}'`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

app.post('/addPassenger', (req, res) => {
  const { name, email, company, bodytype, fromcity, tocity, price } = req.body;

  const sql = `INSERT INTO passenger (name, email, company, bodytype, fromcity, tocity, price) VALUES ('${name}', '${email}', '${company}', '${bodytype}', '${fromcity}', '${tocity}', '${price}')`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Passenger added successfully!');
  });
});

app.listen(8801, () => {
  console.log(`Server is online through port 8801.`);
});
