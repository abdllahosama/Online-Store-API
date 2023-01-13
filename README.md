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
  
  ```sh
  npm install
  ```
 </li>
 
 <li>
  now you need to install new tow database one for dev and publish and another for test you can call them <strong>store_dev</strong> and <strong>store_test</strong>
  
  you can use psql shell as follow: 
  <ul>
   <li>
    first you have to create user runing
    
    CREATE USER 'postgres' WITH PASSWORD '123456'
    
   </li>
   <li>
    Second  you have to create tow database
    
    CREATE DATABASE 'store_dev';
    CREATE DATABASE 'store_test';
    
   </li>
   
   <li>
    third  you have to connect databases with user
    
    GRANT ALL PRIVILEGES ON DATABASE 'store_dev' TO 'postgres';
    GRANT ALL PRIVILEGES ON DATABASE 'store_test' TO 'postgres';
    
   </li>
  </ul>
 </li>
 
 <li>
   now copy env example and add your environment data 
 </li>
 
 <li>
 to start developing run
  
```sh
npm run dev
```
 </li>
<li>
to build project run 
 
```sh
npm run build
```
 </li>
<li> 
 to use prettier run
 
```sh
npm run prettier
```
 </li>
<li>
to use eslint run
 
```sh
npm run eslint
```
 </li>
<li>
to run unit tisting run
 
```command
npm run test
```
  </li>

 </ol>
 
 <h2>end points documentation</h2>
 <p>you can find all end points in this postman workspace: <a href="https://www.postman.com/martian-robot-481018/workspace/online-store-api/collection/25069586-6433beeb-e9ee-4d66-9eb4-91603427b261?action=share&creator=25069586">postman workspace</a></p>
 
 <hr>
 
 <p>I hope you injoy my project :)</p>
