# url-shortener

Fun project to produce a URL Shortener.

There are two implementation:
 - MongoDB and Kubeless
 - MongoDB and Express

This is currently a work-in-progress...

## Purpose

The purpose is to create short urls...just for fun, because you can.

At last check, there is no real money to be made out of shortening URLs but it is a fairly interesting problem to solve at scale. The naive implementation can just push a shortened URL hash (base62, MD5, SHA256, etc.) to a database and ignore the potential collisions.

However, once we consider collisions and scale, then the system becomes more interesting.

## Design considerations

Below follows a diagram depicting AWS components, but the similar components can be used on other cloud providers:
![Cloud Craft Architecture](/assets/serverless-application-architecture.png)

The system components:
 - Cognito user authentication on adding new short urls
 - Short URL hashes stored in DynamoDB
 - ElastiCache/Redis instance for checking most recently used URLs otherwise process in DynamoDB
 - Requests pushed to SQS to process statistics out-of-band of request pipeline
 - Request statistics stored in separate DynamoDB instance/collection

## Environment

The setup of the environment is modelled in a serverless methodology. For local deployment, a local kubernetes cluster is used with Kubeless.

For the Express setup, a base docker compose is used - [docker-compose.yaml](/docker/docker-compose.yml).

## Getting Started (Express)

TODO

## Getting Started (Kubeless)

TODO
