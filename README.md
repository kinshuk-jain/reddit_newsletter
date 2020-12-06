### Description

- Send a customized newsletter with 3 top voted posts in last 24h from each of your favorite sub-reddit channels

- Runs on NodeJS

### Logging

- For the purpose of this project, everything is logged to console. 
- It uses morgan npm package to format http logs which are also logged to console.

### Running the project

##### Requirements to run

- Need nodejs version 12 or above
- You need to create a sendgrid account and setup a Email API Key
- You need to change `from` address to your sender identity in newsletter service

##### Command to run

- Run `npm run start`
