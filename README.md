# mern-stack-app-api

nodemon to help restart the server for you when you make code changes

# Tutorial Link
https://allstate.udemy.com/course/mern-react-node-aws/learn/lecture/18082987#overview

# Get started
Ensure respective node is specified in wsl when running in wsl

http://localhost:8080/register

# Mongo Commands
Delete all documents from a collection
db.users.deleteMany({})

# AWS Support
Create respective role
Create respective group
Add group to role
Add users to group

Create a s3 bucket with the default settings
Can also add a bucket policy for the admin user to put objects into the respective bucket
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddCannedAcl",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::############:user/admin"
            },
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::bucket-name-here/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "public-read"
                }
            }
        }
    ]
```
Add respective CORS configuration in JSON format
```json
[
  {
    "AllowedHeaders": [
      "*"
    ],
    "AllowedMethods": [
      "PUT",
      "POST",
      "GET"
    ],
    "AllowedOrigins": [
      "*"
    ],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

No need for inline policy, since the user was added to the group. The group assigned to the role.