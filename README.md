# asyncApi-jsdoc

![asyncApi logo](https://user-images.githubusercontent.com/777635/37571851-718aa754-2b02-11e8-9749-671991d5c97b.png)

Document your code and keep a live and reusable [AsyncAPI specification](https://www.asyncapi.com/). This specification can be the core of your API-driven project: generate documentation, servers, clients, tests and much more based on the rich AsyncAPI ecosystem of tools.

Based on [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)

## Why

**asyncapi-jsdoc** enables you to integrate AsyncAPI using JSDoc comments in your code. Just add `@asyncApi` on top of your DocBlock and declare the meaning of your code in yaml complying to the AsyncAPI specification.

**asyncapi-jsdoc** will parse your documentation from your actual living code and output an OpenAPI specification to integrate any server and client technology as long as both sides comply with the specification.

Thus, the **asyncapi-jsdoc** project assumes that you want document your existing working code in a way to "give life" to it, generating a specification which can then be feeded into other AsyncAPI tools, and not the vice-versa.

**Supported version**

[AsyncAPI 1.0](https://www.asyncapi.com/v1/spec.html)

## Quickstart

```
npm install asyncapi-jsdoc --save-dev
# or
yarn add --dev asyncapi-jsdoc
```

**asyncapi-jsdoc** works via command line interface. It supports selecting multiple files and recursive subdirectories.

If the module is installed globally, a command line helper `$ asyncapi-jsdoc` will be available. Otherwise `node_modules/.bin/swagger-jsdoc` of your project will have access to the same interface.

**Example of usage:**

```bash
# usage
asyncapi-jsdoc -h
Usage: asyncapi-jsdoc [options] <path ...>

  Options:
    -V, --version                      output the version number
    -d, --definition [asyncApiDef.js]  Input asyncApi definition.
    -o, --output [asyncApiSpec.json]   Output asyncApi specification.
    -h, --help                         output usage information

# read definition file and jsdocs blocks from all files within lib. Outputs to public dir
asyncapi-jsdoc -d example/asyncApiDef.js -o './public/asyncApi.json' 'lib/**/*.js'

# read definition file jsdocs from all files within lib. Outputs to terminal
asyncapi-jsdoc -d example/asyncApiDef.js 'lib/**/*.js'

# read default './asyncApiDef.js', all files within src. Outputs to public
asyncapi-jsdoc -o './public/asyncApi.json' 'src/**/*.js'

# read default './asyncApiDef.js' and all files from lib and src
asyncapi-jsdoc 'lib/**/*.js' 'src/**/*.js'
```

## Contributing

Feel free to open issues or pull requests
