# typescript_crawler

## install in this project(develop)

`npm install -D ts-node `

`npm install typescript -D`

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
