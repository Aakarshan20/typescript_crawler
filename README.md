# typescript_crawler

### init
* generate package.json

``` npm init -y ```

* generate tsconfig.json

``` tsc -- init ```

### uninstall ts-node
``` npm uninstall ts-node -g ```

## install in this project(develop)

`npm install -D ts-node `

`npm install typescript -D`

*see package.json and check devDependencies: ts-node*

## run package.json scripts: dev

`npm run dev`

## run package.json scripts: build

`npm run build`

- might got messages below : File change detected. Starting incremental compilation...

```
"scripts": {
    "dev": "ts-node ./src/crawler.ts",
    "build": "tsc -w" // -w: Watching for file changes.
  }
```

- once file changes, it builds js file automatically

- will transform all ts files to js files and save to outDir ( set in tsconfig.json, default = ./ ) \*

## install remote visit tools

`npm install superagent --save`

## install translate file for ts

`npm i --save-dev @types/superagent`

`npm i --save-dev @types/cheerio`

_details below_

`https://www.npmjs.com/package/@types/superagent`

