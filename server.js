const express = require('express');
const { encode, decode } = require('@msgpack/msgpack');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse MessagePack data
app.use(bodyParser.raw({ type: 'application/msgpack', limit: '10mb' }));

// Endpoints to receive and respond
app.post('/api/messagepacks', (req, res) => {
    console.log('Received data size:', req.body.length, 'bytes');
    console.log('Received data (hex):', req.body.toString('hex'));

    try {
        // Trim any potential padding
        let trimmedBody = req.body;
        while (trimmedBody.length > 0 && trimmedBody[trimmedBody.length - 1] === 0) {
            trimmedBody = trimmedBody.slice(0, -1);
        }

        // Decode the MessagePack data from the request body
        const decodedData = decode(trimmedBody);

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
        res.status(400).send('Error decoding MessagePack data: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:3000");
});