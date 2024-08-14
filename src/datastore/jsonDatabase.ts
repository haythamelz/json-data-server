import { S3ServiceException } from '@aws-sdk/client-s3'
import { getS3Object } from '@helpers/getS3Object.js'
import { putS3Object } from '@helpers/putS3Object.js'

const defaultJsonBody = { apps: [] }

export const getJsonData = async () => {
    try {
        const config = await getS3Object(
            process.env.CONFIG_BUCKET_NAME,
            `${process.env.CONFIG_KEY}.json`,
        )

        if (!config) return defaultJsonBody

        return JSON.parse(config)
    } catch (err: unknown) {
        if (err instanceof S3ServiceException) {
            if(err.name == 'NoSuchKey'){
                await updateJsonData(JSON.stringify(defaultJsonBody))
                return defaultJsonBody
            }
            console.log(
                `**** Failed to get config from s3 due to: ${err.name} ****`,
            )

            throw new Error(`Failed to get config from s3 due to: ${err.name}`)
        }
        throw err
    }
}

export const updateJsonData = async (body: string | undefined) => {
    await putS3Object(
        body,
        process.env.CONFIG_BUCKET_NAME,
        `${process.env.CONFIG_KEY}.json`,
    )
}
