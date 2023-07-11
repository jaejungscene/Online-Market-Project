const express = require('express');
const cors = require('cors');
const path = require('path');
const models = require('./models'); // import SQLite
const app = express();
app.use(express.json());
app.use(cors());
app.use("/upload", express.static("upload"));
const port = 8080;
const multer = require('multer'); // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files


/*********** Storage server **********/
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "upload/") // setting destination folder
        },
        filename: function(req,file,cb){
            cb(null, file.originalname); // make name of image file as original name
        },
    })
}); // designate where the file to be upload

app.post('/images', upload.single('image'), (req,res)=>{
    const file = req.file;
    console.log(file);
    res.send({
        imageUrl: file.path
    })
});
/***********************************/



/*********** API server ************/
app.listen(port, (port)=>{
    console.log(`open port is ${port}`);
    console.log("server is running...");
    models.sequelize.sync()
        .then(()=>{
            console.log('DB 연결 성공!');
        })
        .catch((err)=>{
            console.error(err);
            console.log('DB 연결 에러');
            process.exit();
        });
})

// get all products
app.get("/products", (req, res)=>{
    models.Product.findAll({ // find data in database
        order:[
            ["id","ASC"],
        ],
        attributes:[
            "id",
            "name",
            "price",
            "createdAt",
            "seller",
            "imageUrl"
        ]
    }).then((result)=>{ // if result exits, send data
        console.log("PRODUCTS: ", result);
        res.send({
            products : result
        })
    }).catch((error)=>{
        console.error(error);
        res.send("error occur");
    });
});

app.post("/products", (req,res)=>{
    const body = req.body;
    const {name, description, price, seller, imageUrl} = body;
    if(!name || !description || !price || !seller || !imageUrl){
        res.status(400).send("모든 필드를 입력해주세요.");
    }
    models.Product.create({
        name,
        description,
        price,
        seller,
        imageUrl,
    }).then((result)=>{
        console.log("상품생성 결과:",result);
        res.send({
            result,
        });
    }).catch((error)=>{
        console.error(error);
        res.status(400).send("상품 업로드에 문제가 발생했습니다.");
    })
});

app.get("/products/:id", (req,res)=>{
    const params = req.params;
    const {id} = params;
    models.Product.findOne({
        where:{
            id: id
        }
    }).then((result)=>{
        console.log("PRODUCT:" , result);
        res.send({
            product: result,
        });
    }).catch((error)=>{
        console.eeror(error);
        res.status(400).send("상품 조회에 에러가 발생했습니다.");
    });
});

