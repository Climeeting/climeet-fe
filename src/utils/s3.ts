import * as AWS from 'aws-sdk'
import dayjs from 'dayjs'

// 참고: https://medium.com/how-to-react/how-to-upload-files-on-an-s3-bucket-in-react-js-97a3ccd519d1

// S3 Bucket Name
const S3_BUCKET = import.meta.env.VITE_S3_BUCKET as string
const REGION = import.meta.env.VITE_S3_REGION as string
const ACCESS_KEY = import.meta.env.VITE_S3_ACCESS_KEY as string
const SECRET_ACCESS_KEY = import.meta.env.VITE_S3_SECRET_ACCESS_KEY as string

type Path = 'image' | 'party_thumbnail'

// Function to upload file to s3
export const uploadFileS3 = async (file: File, path: Path = 'image') => {
  // S3 Credentials
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  })

  const fileName = `${dayjs().unix()}-${file.name.replace(/ /g, '_')}`
  const s3 = new AWS.S3({
    params: { Bucket: `${S3_BUCKET}/${path}` },
    region: REGION,
  })

  // Files Parameters
  const params = {
    Bucket: `${S3_BUCKET}/${path}`,
    Key: fileName,
    Body: file,
  }

  // Uploading file to s3
  const upload = s3
    .putObject(params)
    .on('httpUploadProgress', (evt) => {
      // File uploading progress
      console.log('Uploading ' + Math.floor((evt.loaded * 100) / evt.total) + '%')
    })
    .promise()

  // Fille successfully uploaded
  await upload

  return `${import.meta.env.VITE_S3_IMAGE_BASE_URL}/${path}/${fileName}`
}
