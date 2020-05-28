const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request received');
    console.log(req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<html>
    <head>
        <style>
            #container{
                width: 500px;
                height: 300px;
                display: flex;
            }
            #container #myid{
                width:200px;
                background-color: rgb(225, 225, 100);
            }
            #container .c1{
                width:300px;
                background-color: rgb(100, 225, 100);
            }   
        </style>
    </head>
    <body>
        <div id="container">
            <div id="myid"></div>
            <div class="c1"></div>
        </div>
    </body>
    </html>`);

});

server.listen(8088);