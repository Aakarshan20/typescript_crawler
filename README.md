# typescript_crawler

## init

- generate package.json

``` 
npm init -y
```

- generate tsconfig.json

```
tsc -- init
```

## uninstall ts-node global and install it in this project only

- uninstall ts-node

```
npm uninstall ts-node -g
```

- install in this project(develop)

```
npm install -D ts-node 
```
## install typescript in this project ( develop )

```
npm install typescript -D
```

_see package.json and check devDependencies: ts-node_

## run package.json scripts: "dev:dev"

```
npm run ts-node
```

## detected ts file change
## run package.json scripts: "dev:build"

```
npm run dev:build
```

- might got messages below : File change detected. Starting incremental compilation...

## run package.json scripts: dev:start

```
 npm run dev:start 
```

- once file changes, it builds js file automatically

- will transform all ts files to js files and save to outDir ( set in tsconfig.json, default = ./ ) \*

- then nodemon will find js file changed, it runs ``` node ./build/crawler.js ``` immediately

## install concurrently 
```
npm install concurrently -D
```

```
"scripts": {
    "ts-node": "ts-node ./src/crawler.ts",
    "dev:build": "tsc -w" // -w: Watching for file changes.
    "dev:start":"nodemon node ./build/crawler.js",
    "dev":"concurrently npm:dev:*" // run all dev commands
  }
```

## detect js file change

- install nodemon

``` 
npm install nodemon -D 
```

- add the code below to package.json

```
  "nodemonConfig": {
    "ignore": ["data/*"] // ignore files
  },
```

## install remote visit tools

```
npm install superagent --save
```

## install translate file (superagent, cheerio) for ts

```
npm i --save-dev @types/superagent
```

```
npm i --save-dev @types/cheerio
```

_details below_

```
https://www.npmjs.com/package/@types/superagent
```



