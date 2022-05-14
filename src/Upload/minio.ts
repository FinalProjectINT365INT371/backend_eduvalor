const express = require('express')
const multer  = require('multer')
const Minio = require('minio')

const app = express()

const upload = multer({
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)){
            return cb(new Error('Please upload image'));
        }
        cb(null,true);
    }
})

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'Earty',
    secretKey: 'eart4516'
});



app.use(express.json());

app.post('/upload', upload.single('image'), async(req, res)=>{

    const metadata = {
        'Content-type': req.file.mimetype,
      }

    minioClient.putObject('photo', req.file.originalname, req.file.buffer, metadata, function(err, etag) {
        if(err) {
            return console.log(err) // err should be null
        }
    })

    res.status(201).send({ imageName: req.file.originalname })
})

app.get('/getImage', (req,res)=>{

    minioClient.presignedUrl('GET', 'photo', req.body.imageName, 24*60*60, function(err, presignedUrl) {
        if (err) return console.log(err)
        console.log(presignedUrl)
        return res.send({ imageUrl: presignedUrl})
      })

})

app.delete('/delete/:imageName', (req,res)=>{
    minioClient.removeObject('photo', req.params.imageName, function(err) {
        if (err) {
          return console.log('Unable to remove object', err)
        }
        console.log('Removed the object')
      })

      res.send()
})


app.listen(3000, ()=>{
    console.log('app are running on port 3000')
})
