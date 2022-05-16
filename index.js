var express = require("express")
var app = express()
app.use(express.static("pucblic"))
app.set("view engine", "ejs")
app.set("views", "./views")
app.listen(3000)

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//pg setting
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'students',
  password: 'thanh123',
  port: 5432,
})

//1. List
app.get("/sinhvien/list", function(req, res){
    pool.query('SELECT * from sinhvien ORDER BY id ASC', (err, result) => {
        if (err){
            console.log(err)
            return
        }        
        res.render("sinhvienList.ejs", {danhsach: result})
        // pool.end() //muốn dùng nhiều lần thì không nên end
      })

})

//2. Them
app.get("/sinhvien/them", function(req, res){
    //show form
    res.render("sinhvienInsert.ejs")

})
app.post("/sinhvien/them", urlencodedParser, function(req, res){
    //insert db
    if(req.body.txtHoTen && req.body.txtEmail){
        var hoten = req.body.txtHoTen
        var email = req.body.txtEmail
        
        pool.query("INSERT INTO sinhvien(hoten, email) VALUES ('"+ hoten +"', '"+ email +"')", (err, result) => {
            if (err){
                console.log(err)
                return
            }  
            res.redirect("../sinhvien/list")
        })
    }
    
})


//3. Sua
app.get("/sinhvien/sua/:id", function(req, res){
    var id = req.params.id

    pool.query("SELECT * FROM sinhvien WHERE id='"+id+"'", (err, result) => {
        if (err){
            console.log(err)
            return
        }        
        // console.log(result.rows[0])
        res.render("sinhvienEdit.ejs", {sv: result.rows[0]})
      })
})

app.post("/sinhvien/sua", urlencodedParser, function(req, res){
    //insert db
    if(req.body.txtHoTen && req.body.txtEmail && req.body.txtID){
        var hoten = req.body.txtHoTen
        var email = req.body.txtEmail
        var id = req.body.txtID
        
        pool.query("UPDATE sinhvien SET hoten='"+hoten+"', email='"+email+"' WHERE id='"+id+"'", (err, result) => {
            if (err){
                console.log(err)
                return
            }  
            res.redirect("../sinhvien/list")
        })
    }
    
})


//4. Xoa
app.get("/sinhvien/xoa/:id", function(req, res){
    var id = req.params.id

    pool.query("DELETE FROM sinhvien WHERE id='"+id+"'", (err, result) => {
        if (err){
            console.log(err)
            return
        }        
        // console.log(result.rows[0])
            res.redirect("/sinhvien/list")
      })
})




app.get("/", function(req,res){
    res.render("main")
})




