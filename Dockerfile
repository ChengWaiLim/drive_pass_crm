FROM public.ecr.aws/lambda/nodejs:18
COPY . ./
RUN npm install
RUN npm run build
COPY . ./
CMD ["handler.nuxt"]
# CMD ["npm", "run" ,"start"]

# aws ecr get-login-password --region ap-east-1 | docker login --username AWS --password-stdin 553168507573.dkr.ecr.ap-east-1.amazonaws.com
# docker tag hello-world 553168507573.dkr.ecr.ap-east-1.amazonaws.com/hello-world
# docker push 553168507573.dkr.ecr.ap-east-1.amazonaws.com/hello-world
# aws lambda create-function \
#   --function-name hello-world \
#   --package-type Image \
#   --code ImageUri=553168507573.dkr.ecr.ap-east-1.amazonaws.com/hello-world:latest \
#   --role arn:aws:iam::553168507573:role/takeaway-frontend-prod-ap-east-1-lambdaRole

# {
#     "repository": {
#         "repositoryArn": "arn:aws:ecr:ap-east-1:553168507573:repository/hello-world",
#         "registryId": "553168507573",
#         "repositoryName": "hello-world",
#         "repositoryUri": "553168507573.dkr.ecr.ap-east-1.amazonaws.com/hello-world",
#         "createdAt": "2023-07-01T20:28:37+08:00",
#         "imageTagMutability": "MUTABLE",
#         "imageScanningConfiguration": {
#             "scanOnPush": true
#         },
#         "encryptionConfiguration": {
#             "encryptionType": "AES256"
#         }
#     }