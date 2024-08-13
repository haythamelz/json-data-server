import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'

const client = new S3Client({})

export const getS3Object = async (
    bucket: string | undefined,
    key: string | undefined,
) => {
    const input = {
        Bucket: bucket,
        Key: key,
    }

    const command = new GetObjectCommand(input)

    const response = await client.send(command)
    const configContent = await response.Body?.transformToString()
    return configContent
}
