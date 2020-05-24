# Deno REST API with MongoDB

A basic REST API boilerplate built with Deno and MongoDB.

### Features

- [x] [Oak](https://github.com/oakserver/oak) framework.
- [x] [deno-mongo](https://github.com/manyuanrong/deno_mongo)
- [x] basic CRUD operations.

### Getting Started

```bash
git clone https://github.com/drejohnson/deno-rest-api-mongo.git

cd deno-rest-api-mongo
```
Add credentials to .env

```bash
cp .env.example .env
```

To run server

```bash
deno run --allow-net --allow-write --allow-read --allow-plugin --unstable server.ts
```
