const https = require('https');

const data = JSON.stringify({
  osType: "windows",
  osArch: "x64",
  imei: "DevEcoS",
  supportVersion: "3.1-hos-double-14"
});

const options = {
  hostname: 'devecostudio-drcn.op.hicloud.com',
  path: '/sdkmanager/v5/hos/getSdkList',
  method: 'POST',
  headers: {
    'AppId': 'DevEcoStudio_Cli',
    'Version': '2.0.2'
  }
};

const req = https.request(options, (res) => {
  let responseBody = '';

  res.on('data', (chunk) => {
    responseBody += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(responseBody)[0].archive;
      console.log('Response:', json);
    } catch (e) {
      console.error('Error parsing response:', e);
      console.log('Raw response:', responseBody);
    }
  });
});

req.on('error', (err) => {
  console.error('Request error:', err);
});

req.write(data);
req.end();