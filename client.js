const { encode, decode } = require('@msgpack/msgpack');
const axios = require('axios');

async function sendMsgPackData() {
  const packedData = encode("Helloworld" );
  const packD = encode(48);
  const packedData2 = encode("hello wordl")

  if(packedData === packedData2){
    console.log("msgpack hag diya")
  }

  console.log('Sending packed data:', packedData);
  console.log('Sending packed data:', packedData2);

  console.log('Sending packed data:', packD);


//   try {
//     const response = await axios.post('http://localhost:3000/api/messagepacks', packedData, {
//       headers: { 'Content-Type': 'application/msgpack' },
//       responseType: 'arraybuffer'
//     });

//     console.log('Raw response data:', response.data);

//     if (response.data) {
//       const responseData = decode(Buffer.from(response.data));
//       console.log('Decoded response data:', responseData);
//     } else {
//       console.error('Response data is undefined or null');
//     }

//   } catch (error) {
//     console.error('Error:', error);
//   }
}

sendMsgPackData();
