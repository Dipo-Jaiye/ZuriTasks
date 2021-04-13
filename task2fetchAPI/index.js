const {get} = require('http');
const {writeFile, mkdir} = require("fs").promises;

get('http://jsonplaceholder.typicode.com/posts', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  // Any 2xx status code signals a successful response but
  // here we're only checking for 200.
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // Consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let jsonData = '';
  res.on('data', (chunk) => { jsonData += chunk; });
  res.on('end', () => {
    try {
      console.log("Data from posts has been received!\n");
      const resPath = "./result"; //directory file to save the posts
      mkdir(resPath,{recursive:true}) //recursive true to ensure it doesn't give error if the dir already exists
      .then(data => {
          console.log("Dir made!"); //promise format to make sure to write the file
          return writeFile(resPath + "/posts.json", jsonData);  //after dir exists
        })
      .catch(err => {console.log(`Error making directory: ${err.message}`)}) 
      .then(()=>console.log("File created successfully"))
      .catch(err => console.log(`Error saving file: ${err.message}`));     
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error retrieving data from URL: ${e.message}`);
});