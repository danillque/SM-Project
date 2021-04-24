import Express from 'express';
import {resolve} from 'path';
import * as WebSocket from 'ws';
import { createServer } from 'http';
import { readFile } from 'fs/promises';


const rootPath = resolve(__dirname, '..');
process.chdir(rootPath);

const app = Express();

const httpServer = createServer(app);

const wss = new WebSocket.Server({ server : httpServer });

const widgetsFile = resolve( rootPath, 'widget.json' );

wss.on(
	'connection', 
	async ( ws ) =>
	{
		const content = await readFile( widgetsFile, 'utf8' );
			
		const feedbacks = JSON.parse( content );

		ws.send(feedbacks);

        ws.on( 'message', (message) => {
            console.log("recieved", message);
            ws.send("Recieved youe message, it is" + message);
        });
	},
);
/*

const messages: string[] = [];

wss.on(
	'connection',
	( ws ) =>
	{
		ws.on( 'message', () => onClientMessage );
		ws.send(
			JSON.stringify( messages ),
			onSendError,
		);
	},
);

function onClientMessage( this: WebSocket, data: WebSocket.Data ): void
{
	if ( typeof data !== 'string' )
	{
		this.send(
			JSON.stringify( {
				message: 'Wrong data type',
			} )
		);
		
		return;
	}
	
	messages.push( data );
	broadcastMessages();
}

function broadcastMessages(): void
{
	for ( const client of wss.clients )
	{
		if ( client.readyState === WebSocket.OPEN )
		{
			client.send(
				JSON.stringify( messages ),
				onSendError,
			);
		}
	}
}

function onSendError( error?: Error )
{
	if ( error )
	{
		console.error( error );
	}
} */

app.get('/', (_req, _res)=>{
	console.log("Here!");
});

app.use(Express.static( resolve( rootPath, 'public' ) ) );
httpServer.listen( 8000, () => console.log('Port 8000'));

