const sequelize = require("sequelize")

const db = new sequelize({
    database: "testDB",
    username: "postgres",
    password: "thanh123",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    dialectOption:{
        ssl:false
    },
    define:{ //để ngăn việc db tự động thêm s khi define use
        freezeTableName: true,
    }
})

//kết nối db
db.authenticate()
.then(() => console.log("ket noi thanh cong")) 
.catch(err => console.log(err.message))

//tạo table
const user = db.define("user", {
    username: sequelize.STRING,
    password: sequelize.STRING
})

//đưa user vừa tạo vào db
db.sync()


//sequelize sẽ tự động add vào id, createdAt, updatedAt

