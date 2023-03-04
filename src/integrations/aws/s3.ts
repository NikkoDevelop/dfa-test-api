import fs from 'fs';
import { AWS_BUCKET, AWS_REGION } from '../../configs';
import aws from './index';

const ACL = 'public-read';

const client = new aws.S3({
  signatureVersion: 'v4',
  region: AWS_REGION,
});

export const uploadFile = async (filepath: string, fileName: string): Promise<string> => {
  await fs.readFile(filepath, async (err, data) => {
    if (err) {
      throw err;
    };

    let params: any = {};

    params = {
      Body: data,
      Bucket: AWS_BUCKET,
      Key: `${fileName}`,
      ACL,
    };

    await client.upload(params, async (uploadErr, _uploadData) => {
      if (uploadErr) {
        throw uploadErr;
      };
    });
  });

  return `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${fileName}`;
};
