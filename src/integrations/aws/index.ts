import AWS from 'aws-sdk';
import { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } from '../../configs';

const accessKeyId = AWS_ACCESS_KEY;
const secretAccessKey = AWS_SECRET_KEY;

AWS.config.update({ region: AWS_REGION, accessKeyId, secretAccessKey });

export default AWS;
