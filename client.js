const { encode, decode } = require('@msgpack/msgpack');
const axios = require('axios');

async function sendMsgPackData() {
  const dataToSend = {
    boolean: true,
    number: 42,
    string: "Hello, MessagePack!",
    array: [1, 2, 3],
    object: { key: "value" }
  };

  console.log('Original data:', dataToSend);

  const packedData = encode(dataToSend);

  console.log('Packed data size:', packedData.byteLength, 'bytes');
  console.log('Packed data (hex):', Buffer.from(packedData).toString('hex'));

  try {
    const response = await axios.post('http://localhost:3000/api/messagepacks', packedData, {
      headers: { 'Content-Type': 'application/msgpack' },
      responseType: 'arraybuffer'
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Response data size:', response.data.byteLength, 'bytes');
    
    const responseBuffer = Buffer.from(response.data);
    console.log('First 10 bytes of response (hex):', responseBuffer.slice(0, 10).toString('hex'));
    console.log('First 10 bytes of response (utf8):', responseBuffer.slice(0, 10).toString('utf8'));
    
    if (response.data) {
      try {
        // Try to decode just the first few bytes
        const partialDecode = decode(responseBuffer.slice(0, 10));
        console.log('Partial decode result:', partialDecode);
      } catch (partialDecodeError) {
        console.error('Error in partial decode:', partialDecodeError.message);
      }

      try {
        const responseData = decode(responseBuffer);
        console.log('Decoded response data:', responseData);
      } catch (decodeError) {
        console.error('Error decoding full response:', decodeError.message);
      }
    } else {
      console.error('Response data is undefined or null');
    }
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      if (error.response.data) {
        console.error('Response data size:', error.response.data.byteLength, 'bytes');
        console.error('First 10 bytes of response data:', Buffer.from(error.response.data).slice(0, 10).toString('hex'));
      }
    }
  }
}

sendMsgPackData();