### Frontend

Deployment

```
npm run build
```
```
aws s3 sync build/ s3://{bucket name} --delete 
```

### Backend

Deployment

```
sam build -t aws-resources.yaml
```
```
sam deploy --stack-name RecipeCollabBackend --region ap-southeast-2 --capabilities CAPABILITY_IAM --resolve-s3 --no-fail-on-empty-changeset
```