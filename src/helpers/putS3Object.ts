import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const client = new S3Client({})

export const putS3Object = async (
    body: string | undefined,
    bucket: string | undefined,
    key: string | undefined,
) => {
    const input = {
        Body: body,
        Bucket: bucket,
        Key: key,
    }

    const command = new PutObjectCommand(input)

    await client.send(command)
}
