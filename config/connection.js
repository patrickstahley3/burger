// Set up MySQL connection.
var mysql = require("mysql");

var connection= mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "password",
    database: "burgers_db"

});

connection.connect( function(err){
    if(err){
        throw err
        console.error( `error: ${err.stack}`)
    }
    console.log(`connected as ${connection.threadId}`)
})

module.exports=connection;