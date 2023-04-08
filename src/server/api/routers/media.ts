import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import S3 from "aws-sdk/clients/s3";
import { z } from "zod";
import { randomUUID } from "crypto";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: env.AWS_BUCKET_ACCESS_KEY,
  secretAccessKey: env.AWS_BUCKET_SECRET_KEY,
  region: env.AWS_BUCKET_REGION,
  signatureVersion: "v4",
});

export const mediaRouter = createTRPCRouter({
  uploadNewPostImageToS3: protectedProcedure
    .input(z.object({ imageExtension: z.string() }))
    .mutation(({ input }) => {
      const imageExtension = input.imageExtension.split("/")[1] ?? "";
      const fileName = `${randomUUID() ?? ""}.${imageExtension}`;

      const s3Params = {
        Bucket: env.AWS_BUCKET_NAME,
        Key: fileName,
        Expires: 60,
        ContentType: `image/${imageExtension}`,
      };

      const preSignedUrl = s3.getSignedUrl("putObject", s3Params);

      return {
        preSignedUrl,
        fileName,
        url: `${env.AWS_BUCKET_URL}${fileName}`,
      };
    }),
});
