const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const bodyparser = require('body-parser')

const app =express();
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.get('/data',(req,res)=>{
    Data.find().then((item)=>res.send(item))
})

app.post('/create',(req,res)=>{
    Data.create(req.body).then((item)=>res.send(item))
})


// app.put('/deposit/:id', (req, res) => {
//     const { id } = req.params; // Get the ID of the document to update
//     const { amount } = req.body; // Get the deposited amount from the request body

//     Data.findByIdAndUpdate(id, { $inc: { amount: amount } }, { new: true }, (err, updatedItem) => {
//         if (err) {
//             console.error('Error updating document:', err);
//             res.status(500).send('Internal Server Error');
//         } else if (!updatedItem) {
//             res.status(404).send('Document not found');
//         } else {
//             res.send(updatedItem);
//         }
//     });
// });

// app.delete('/delete',(req,res)=>{
//     Data.deleteOne(req.body).then((item)=>res.send(item))
// })

app.listen(8080,()=>{
    console.log(`server is running ${8080}`);
})

mongoose.connect("mongodb+srv://prakash5252064:2VHv4SLtqzgwRPGn@cluster0.ghncz3g.mongodb.net/mca")
.then(console.log("Mongodb Connected"))

var newSchema = new mongoose.Schema({
    id:Number,
    name:String,
    email:String,
    password:String,
    amount:Number
})

let Data = mongoose.model('mca',newSchema)

// useEffect(() => {
//     async function fetchdata() {
//         await axios.get('http://localhost:8080/data').then((item) => {
//          setData(item.data);
//          console.log(data);
//          let itemLength = item.data.length - 1;
//          setTotal(item.data[itemLength].amount);
//         })
//     }
//     fetchdata();
// }, [total])


// let data1 = new Data(
//     {
//        name:"Prakash kumar",
//        email:"pk@gmail.com",
//        password:"123",
//        amount:"1000" 
//     }
// )
// data1.save()

app.put('/update/:id',async(req,res)=>{
    console.log(req.params.id);
     console.log(req.body);
   const amount = req.body.amount;
   
  const userUpdate= await Data.findByIdAndUpdate(req.params.id,{amount:amount},{new:true,});
    res.json({
     data:userUpdate
})
})
app.delete('/delete/:id',async(req,res)=>{
    console.log(req.params.id);
    const userDelete= await Data.findByIdAndDelete(req.params.id);
    res.json({
     data:userDelete
})
})