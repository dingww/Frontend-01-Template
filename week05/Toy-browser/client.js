
class Request{
    // method, url=host+port+path;
    //body: key/value
    //headers
    constructor(options){
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = 'application/x-www-form-urlencoded';
        }
        if(this.headers["Content-Type"] === 'application/json'){
            this.bodyText = JSON.stringify(this.body);
        }else if(this.headers["Content-Type"] === 'application/x-www-form-urlencoded'){
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }

    requestText(){
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}
`
    }
    send(connection){
        const parser = new ResponseParser;
        return new Promise((resolve, reject) => {
            if(connection){
                connection.write(this.requestText())
            }else{
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.requestText())
                })
            }
            connection.on('data', (data) => {
                
                parser.receive(data.toString());
                if(parser.isFinished){
                    resolve(parser.response)
                }
                // console.log('///data///',JSON.stringify(parser.response));
                // console.log(parser.headers);
                // resolve(data.toString());
                connection.end();
            });
            connection.on('error', (error) => {
                reject(error);
                connection.end();
            });
        })
        
       
    }

}

class ResponseParser{
    constructor(){
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;
        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = '';
        this.headers = {};
        this.headerName = '';
        this.headerValue = '';
        this.bodyParser = null;
    }

    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished;
    }

    get response(){
        this.statusLine.match(/HTTP\/1.1 (\d+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }

    receive(string){
        for(let i = 0; i < string.length; i++){
            this.receiveChara(string.charAt(i));
        }
    }

    receiveChara(chara){
        if(this.current === this.WAITING_STATUS_LINE){
            // console.log(chara)
            if(chara === '\r'){
                // console.log('//////');
                this.current = this.WAITING_STATUS_LINE_END;
            }else if(chara === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }else{
                this.statusLine +=chara
            }
        }else if(this.current === this.WAITING_STATUS_LINE_END){
            if(chara === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }

        }else if(this.current === this.WAITING_HEADER_NAME){
            if(chara === ':'){
                this.current = this.WAITING_HEADER_SPACE;
            }else if(chara === '\r'){
                this.current = this.WAITING_HEADER_BLOCK_END;
                if(this.headers["Transfer-Encoding"] === 'chunked'){
                    this.bodyParser = new TrunkedBodyParser();
                }
                
            }else{
                this.headerName += chara;
            }
        }else if(this.current === this.WAITING_HEADER_SPACE){
            if(chara === ' '){
                this.current = this.WAITING_HEADER_VALUE;
            }
            // else{
            //     this.headerValue += chara;
            // }
        }else if(this.current === this.WAITING_HEADER_VALUE){
            if(chara === '\r'){
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = "";
                this.headerValue = "";
            }else{
                this.headerValue += chara;
            }
        }else if(this.current === this.WAITING_HEADER_LINE_END){
            if(chara === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }
        }else if(this.current === this.WAITING_HEADER_BLOCK_END){
            if(chara === '\n'){
                this.current = this.WAITING_BODY;
            }
        }else if(this.current === this.WAITING_BODY){
            this.bodyParser.receiveChara(chara);
        }


    }
}
class TrunkedBodyParser{
    constructor(){
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }
    receiveChara(chara){
        // console.log(JSON.stringify(chara));
        // console.log(this.current);
        if(this.current === this.WAITING_LENGTH){
            // console.log(chara)
            if(chara === '\r'){
                if(this.length === 0){
                    // console.log(this.content);
                    // console.log('//////');
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            }else{
                this.length *=10;
                this.length += chara.charCodeAt(0) - '0'.charCodeAt(0);
            }
        }else if(this.current === this.WAITING_LENGTH_LINE_END){
            // console.log('WAITING_LENGTH_LINE_END')
            if(chara === '\n'){
                this.current = this.READING_TRUNK;
            }
        }else if(this.current === this.READING_TRUNK){
            // console.log(chara)
            this.content.push(chara);
            this.length--;
            if(this.length === 0){
                this.current = this.WAITING_NEW_LINE;
            }
        }else if(this.current === this.WAITING_NEW_LINE){
            // console.log(chara)
            if(chara === '\r'){
                this.current = this.WAITING_NEW_LINE_END;
            }
        }else if(this.current === this.WAITING_NEW_LINE_END){
            // console.log(chara)
            if(chara === '\r'){
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}

const net = require('net');

void async function(){
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
          ['X-Foo2']: 'aaa'
        },
        body: {
          name: 'della'
        }
    });
    let response = await request.send();
    console.log(response);
}()
