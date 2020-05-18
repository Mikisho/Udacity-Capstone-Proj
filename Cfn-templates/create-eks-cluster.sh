aws eks --region us-east-1 create-cluster --name UdacityCapestoneProjEks --role-arn
arn:aws:iam::546586657828:role/capestone-eks-role --resources-vpc-config 
subnet-0057ea5d9ae41c97b,subnet-0d96e8e1c7630d66a,
subnet-05d8468e3fe4028c5,securityGroupIds=sg-09dc335f2833cbe76