import AWS from 'aws-sdk'

const polly = new AWS.Polly({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
})

export default polly
