import Express from 'express';
import {resolve} from 'path';
import * as WebSocket from 'ws';
import { createServer } from 'http';
import { readFile, writeFile} from 'fs/promises';


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
        ws.on( 'message', async (message) => {
			if(message.toString() !== "request")
				await writeFile(widgetsFile, message.toString());
			const content = await readFile( widgetsFile, 'utf8' );
			for(const client of wss.clients)
			    client.send(content); 
			console.log("Content was send to clients.");
        });
	},
);

app.get('/', (_req, _res)=>{
	console.log("Here!");
});

app.use(Express.static( resolve( rootPath, 'public' ) ) );
httpServer.listen( 8000, () => console.log('Port 8000'));
