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

Allow public read access to objects in bucket
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddCannedAcl",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::BUCKET_NAME/*"
        }
    ]
}
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

# Elastic Beanstalk Support
Compile project into javascript and place into a zip file.