const express=require('express')
const fun=express()
const mySql=require('mysql')
const { CLIENT_LONG_PASSWORD } = require('mysql/lib/protocol/constants/client')

const connection= mySql.createConnection({
    host        :   'localhost',
    user        :   'root',
    password    :   'Xeraton246810',
    database    :   'pedidos'
});

connection.connect()

fun.set('view engine','ejs')

fun.get('/', function(pet,res){
    connection.query('SELECT COUNT(*) as cuenta FROM producto ', function(error, filas,campos){
        res.render('pages/index',{total:filas[0].cuenta})
    } )
    
})


var pool = mySql.createPool({  connectionLimit: 20,  host: 'localhost',  user: 'root',  password: 'Xeraton246810',  database: 'pedidos'})


fun.get('/pool', function(pet,res){
    pool.query('SELECT COUNT(*) as cuenta FROM martes_febrero_2022 ', function(error, filas,campos){
        res.render('pages/pool',{total:filas[0].cuenta})
    } )
} )
    

fun.get('/pedidos', function(pet,res){
   
       pool.getConnection(function(err, connection){
        const query= `SELECT * FROM martes_febrero_2022 WHERE PRODUCTO = 
        ${connection.escape(pet.query.PRODUCTO)}`

        connection.query(query, function(error, filas, campos){
            res.render('pages/pedidos',{martes_febrero_2022:filas})})
    
        connection.release()
    })


})



fun.listen(8080,function(){

    console.log("Servidor iniciado")}

)