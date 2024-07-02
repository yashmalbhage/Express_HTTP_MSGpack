const express  = require('express');
const {encode, decode}  = require('@msgpack/msgpack');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

//middleware to pass messagepack

app.use(bodyParser.raw({ type: 'application/msgpack' }));

//endpoints to recieve and respone

app.post('/api/messagepacks', (req, res) => {
    try {
        // Decode the MessagePack data from the request body
        const decodedData = decode(req.body);

        console.log('Decoded MessagePack data:', decodedData);

        // Prepare a response
        const response = {
            message: 'Data received and processed',
            receivedData: decodedData
        };

        // Send MessagePack-encoded response
        res.set('Content-Type', 'application/msgpack');
        res.send(encode(response));
    } catch (error) {
        console.error('Error decoding MessagePack data:', error);
        res.status(400).send('Error decoding MessagePack data');
    }
});


app.listen(PORT, ()=>{
    console.log("server running http://localhost:3000")
})

