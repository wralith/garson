# Garson

Did I just created legacy code in fresh project?

## Dev Setup

```sh
cd server
pnpm dev
```

### Tests

```sh
pnpm test
# Or
pnpm test:coverage
```

## What is this?

Some DDD, just a little bit.  
Node.JS application written in `Typescript` with lots of unit tests.  
Look at me, i am extending Entity class for no reason.

Beside jokes:

### Modular Monolith

- Lots of repetition I know! But we can separate modules to `microservices` and create `adapter` to the whatever communication system we want and connect to the service.
- Hexagonal modules. Isn't it?
- `main.ts` looks delicious. 🥞

### Javascript / Typescript

- There is no `any`, everything typed properly okay but, umm, run-time.
- I didn't followed immutable patterns and mutated entities here and there, sad.
- OOP, classes everywhere in the end they are all `object` or `function` or both what?

### Libraries

- Some http router, some unique id library, some verification library so `express`.

## Todos

- [ ] Error handling is awful _if there is one_, fix it!
- [ ] Connect some real database with seeds, then more tests!
- [ ] Maybe defined contracts but i am not so sure
- [ ] Where is docs? Swagger
- [ ] Maybe a frontend? Maybe
