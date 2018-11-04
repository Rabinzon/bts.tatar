import AWS from 'aws-sdk';
import fs from 'fs';

const spacesEndpoint = new AWS.Endpoint(process.env.S3_ENDPOINT);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

export default async (fileName, filePath, fileType) => {
  await new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => {
      reject(err);
    });

    return s3.upload({
      Bucket: process.env.S3_BUCKET,
      Body: stream,
      Key: fileName,
      ACL: 'public-read',
      ContentType: fileType,
    }, (err, data) => {
      console.log(err, data);
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
};
