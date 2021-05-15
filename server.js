//Writing basic HTTP Server. For this, we need the following line below
const http= require("http");

const hostname="localhost";
const port= 3000;

//This will help the server read the static codes (index.html and aboutus.html)
const path= require("path");
const fs= require("fs");

//Setting up the server
//http.createServer() creates the server with the http server class. It takes a request handler callback function as a parameter, which is written below with an arrow function.
//This request handler is called everytime the server receives a request. The request handler takes in two objects as parameters, request (req) and response (res).
//We do not create the response object ourselves, we receive it. We will add data to the response and send it back.
//Request and response objects are special types of objects called Strings.  With Strings, data is not transfered all at once, but at junks that are read piece by piece.
//Response object is already created when the request has been received from the server.
//The request object gives us access to the headers using req.headers.
const server= http.createServer((req, res) =>{
    console.log(`Request for ${req.url} by method ${req.method}`);

    if(req.method==="GET"){ //Making sure this is a GET request, otherwise else statement will run.
        let fileUrl= req.url; //Get the contents of the request url like this. If the request came in and it was just to the host name, without specifiying a URL beyond that (such as aboutus.html), req.url property would just have a forward slash.
        if(fileUrl==="/") {
            fileUrl="/index.html";
        }
        //The code below will give us the full absolute path to this file.  This full absolute path will be stored in the filePath variable.
        const filePath= path.resolve("./public" + fileUrl) //Convert from a relative path to an absolute path. the fileUrl variable will already have the forward slash, /, which is why we don't add one after public.
    
        //Server will only grant request to HTML files. We will check to see if the file is an HTML file.
        const fileExt= path.extname(filePath);
        if(fileExt=== ".html") {
            fs.access(filePath, err => { //Makes sure that this HTML file even exists and is accessible in the server. Access method takes two arguments, the path of the file that we want to check and a callback function that takes an error argument (which will be called err). If file is not accessible, error object will be passed to this error argument.
                if (err) {
                    res.statusCode= 404;
                    res.setHeader("Content-Type", "text/html");
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found.</h1></body></html>`);
                    return; //Using a return so that the code after this is not executed.
                }
                //Successful response Status Code
                res.statusCode= 200;
                res.setHeader("Content-Type", "text/html");

                fs.createReadStream(filePath).pipe(res); //fs.createReadStream() method takes care of reading the contents of the file that it is given in small chunks, not the entire file. The pipe() method means we are sending the contents from filePath to this pipe method that will send it to the response object.
                //pipe() method is available on Node Streams. Response object is called a Stream and fs.createReadStream and creates a Stream object.
            }); 
        } else { //Error message will be shown if fileExt is not an HTML file.
            res.statusCode= 404;
            res.setHeader("Content-Type", "text/html");
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file.</h1></body></html>`);
        }
    } else { //Error message will be shown when req.method is not a Get request
        res.statusCode= 404;
        res.setHeader("Content-Type", "text/html");
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
    /*console.log(req.headers);
    res.statusCode= 200; //HTTP Status Code
    //Anytime you are sending HTML in the body, set the header just like in the line below.
    res.setHeader("Content-Type", "text/html"); //Content-Type will be passed into the first argument. Content-Type tells client what type of data to expect in the response body. Second argument is text/html which passes the value of the header.
    res.end("<html><body><h1>Hello World!</h1></body></html>"); //Close the response stream using the res.end() method. We are passing in the body of the response in this end tag. The client will be able to see the body of this response (client will see Hello World!).
    */
}); 

//Starting the server by letting it listen to an event handler
//It has three arguments: port (from line 5 in code), hostname (from line 4 in code) and this is a callback function that will be executed when the server starts up. 
server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}: ${port}/`);
});