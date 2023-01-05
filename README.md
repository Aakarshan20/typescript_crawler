# typescript_crawler

_backend project_

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

- then nodemon will find js file changed, it runs `node ./build/crawler.js` immediately

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

## express

```
npm install express --save
```

```
npm i --save-dev @types/express
```

```
npm install body-parser --save
```

## login via cookie session

- ref

```
https://github.com/expressjs/cookie-session
```

- install

```
 npm install cookie-session -save
```

## install reflect-metadata

```
npm  install reflect-metadata --save
```

## use create-react-app

- uninstall old version ( global )

```
npm uninstall create-react-app -g
```

- download latest create-react-app if not exist, it will named react-project and use typescript as template and dependent by npm

```
npx create-react-app react-project --template typescript --use-npm
```

_if not response, try these command below: change mirror source_

```
npm config set registry https://registry.npmjs.org/
```

_show current mirror source_

```
npm config get registry
```

_if stuck in some command_

```
npm cache clean --force
```

- initial npm

```
npm init
```

- download via npm but not npx

```
npm install create-react-app
```

- install by npx and typescript npm

```
npx create-react-app react-project --template typescript --use-npm
```
