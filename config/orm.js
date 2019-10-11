// Import MySQL connection.
var connection = require("./connection.js");
//console.log(connection)

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

//orm: all, create, updte, delete

// make a questionmark function
var orm={
    all: function(tableName, callBack){
connection.query(`SELECT * FROM ${tableName}`, function(err, res){
    if(err)throw err
    callBack(res)
} )  
    },
    create: function(tableName, cols, vals, callBack){
        connection.query(`INSERT INTO ${tableName} (${cols.toString()}) VALUES (${questionMarks(vals.length)})`, vals, function(err, res){
            if(err)throw err
            callBack(res)
        })
       

    },
    update: function(table, objColVals, condition, callBack) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          callBack(result);
        });
      },
      delete: function(table, condition, callBackk) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          callBack(result);
        });
      }
}
module.exports = orm;

