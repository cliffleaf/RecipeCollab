https://www.recipecollab.com

### Tech Stack

| Component      | Technology                                     |
| -------------- | ---------------------------------------------- |
| Infrastructure | Route 53 + CloudFront + S3 + DynamoDB + Lambda + CloudFormation|
| Frontend       | Vite + React.js + Milkdown (md editor)         |
| Backend        | Python                                         |

### Frontend

Deployment

```
npm run build
```
```
aws s3 sync dist/ s3://{bucket name} --delete --exclude "index.html" --cache-control "public,max-age=31536000,immutable"
```
```
aws s3 cp dist/index.html s3://{bucket name}/index.html --cache-control "no-store" --content-type "text/html"           
```

Then invalidate `/index.html` in CloudFront, because edge locations will be keep using the outdated bytes until cache TTL ends

### Backend

Deployment

```
sam build -t aws-resources.yaml
```
```
sam deploy --stack-name RecipeCollabBackend --region ap-southeast-2 --capabilities CAPABILITY_IAM --resolve-s3 --no-fail-on-empty-changeset
```
