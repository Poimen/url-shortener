# url-shortener

Fun project to produce a URL Shortener....enter the Enterprise URL shortner.

There are two implementation:
 - MongoDB and Kubeless (TBD)
 - MongoDB and Express (WIP)

This is currently a work-in-progress.

This is overly engineered on purpose to have a little fun with the domain as well as to test out some DDD concepts.

If I have energy I will add some tests, but right now this is just a test repo.

## Purpose

The purpose is to create short urls...just for fun and because you can.

At last check, there is no real money to be made out of shortening URLs but it is a fairly interesting problem to solve at scale. The naive implementation can just push a shortened URL hash (base62, MD5, SHA256, etc.) to a database and ignore the potential collisions. This works fine and can be done in a few lines of code. This implementation just loops on storage...fancy, I know.

If the write side was needing to be truly performant you could run a number of counter services behind a load balancer that can provide seed indexes to the generator. Another option is to use a queue that is consumed with services that confirms the integrity out-of-band.

Either way, eventually collisions will happen, and for fun, maybe this will be done.

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

The exposed endpoint is by default:
```
http://localhost:3002/:hash
```
and
```
http://localhost:3002/api/v1/admin
```

## Getting Started (Express)

1. Clone repo
2. Install dependencies:
```shell
npm install
```

3. Start up the docker images
```shell
cd docker
docker-compose up -d
```

4. Start development server
```shell
npm run dev
```

### Testing Express

A rest file is provided to be used with the [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension in VS Code. These can be adapted to Postman scripts.

## Getting Started (Kubeless)

TODO
