<h1>🏛️ Online Store API</h1>
<p>
 online store API is as store front api that provide front store reqired end points for authanticate , products and orders that depends on MVC design pattern, each line of code is documented, tested and typed so that you can just clone the repo and start add your custom edits easly .
 the project is seperated to folders as follow:
 <ul>
  <li>Controllers folder that contain all controllers file</li>
  <li>Middlewares floder that contain all middleware files</li>
  <li>Models floder that contain all Models files that manage database</li>
  <li>Routes floder that contain all Routes files thant point to controllers</li>
  <li>Tests floder that contain all test files that has same src stracture</li>
  <li>Utilities floder that contain all services files</li>
  <li>Config file that get config data from env file</li>
  <li>Database file that connect to database</li>
  <li>Server file that run express</li>
 </ul>
</p>

<h2>what is used in thes prject ? </h2>
<ol>
 <li><a href="typescriptlang.org"> typescript</a> for write strong typed code </li>
 <li><a href="https://expressjs.com/">express</a> for creating serve</li>
 <li><a href="https://prettier.io/">prettier </a> to make code readable</li>
 <li><a href="https://eslint.org/">eslint</a> for check our code</li>
 <li><a href="https://www.npmjs.com/package/bcrypt">bcrypt</a> for hash passwords</li>
 <li><a href="https://www.npmjs.com/package/dotenv">dotenv</a> for get data from .env file</li>
 <li><a href="https://www.npmjs.com/package/jsonwebtoken">jsonwebtoken</a> for authurisation</li>
 <li><a href="https://www.npmjs.com/package/pg">pg</a> for connecting to database</li>
 <li><a href="https://jasmine.github.io/">jasmine</a> for unit testing</li>
 <li><a href="https://www.npmjs.com/package/supertest">supertest</a> for testing end points</li>
</ol>

<h2>getting star with the project ?</h2>
<ol>
 <li>
first off all you have to check your node using following

```command
npm -v
```
 </li>
 
  <li>
scond you have to clone the project to your pc

 </li>
 
 <li>
 now you have to install node modules using  the folloing command
  
  ```command
  npm install
  ```
 </li>
 
 <li>
 now copy env example and add your environment data *dont forget to create dev and test database*
 </li>
 <li>
 to start developing run
```
npm run dev
```
 </li>
<li>
to build project run 
```
npm run build
```
 </li>
<li> 
 to use prettier run
```
npm run prettier
```
 </li>
<li>
to use eslint run
```
npm run eslint
```
 </li>
<li>
to run unit tisting run
```
npm run test
```
  </li>

 </ol>
