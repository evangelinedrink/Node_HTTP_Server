//Writing basic HTTP Server. For this, we need the following line below
const http= require("http");

const hostname="localhost";
const port= 3000;

//Setting up the server
//http.createServer() creates the server with the http server class. It takes a request handler callback function as a parameter, which is written below with an arrow function.
//This request handler is called everytime the server receives a request. The request handler takes in two objects as parameters, request (req) and response (res).
//We do not create the response object ourselves, we receive it. We will add data to the response and send it back.
//Request and response objects are special types of objects called Strings.  With Strings, data is not transfered all at once, but at junks that are read piece by piece.
//Response object is already created when the request has been received from the server.
//The request object gives us access to the headers using req.headers.
const server= http.createServer((req, res) =>{
    console.log(req.headers);
    res.statusCode= 200; //HTTP Status Code
    //Anytime you are sending HTML in the body, set the header just like in the line below.
    res.setHeader("Content-Type", "text/html"); //Content-Type will be passed into the first argument. Content-Type tells client what type of data to expect in the response body. Second argument is text/html which passes the value of the header.
    res.end("<html><body><h1>Hello World!</h1></body></html>"); //Close the response stream using the res.end() method. We are passing in the body of the response in this end tag. The client will be able to see the body of this response (client will see Hello World!).
}); 

//Starting the server by letting it listen to an event handler
//It has three arguments: port (from line 5 in code), hostname (from line 4 in code) and this is a callback function that will be executed when the server starts up. 
server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}: ${port}/`);
});