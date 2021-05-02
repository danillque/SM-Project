
export class Greeting{
    greetOutput: HTMLElement;
    socket : WebSocket;

    constructor(element : HTMLElement){
        this.greetOutput = element;
       this.socket = new WebSocket('ws://localhost:8000');
        this._handleSocket = this._handleSocket.bind(this);
        this.socket.addEventListener('message', this._handleSocket);
        this.run();
        setInterval(() => this.run(), 3600000);
    }

    _handleSocket(event: MessageEvent){
        const jsonData = JSON.parse(event.data);
      
        if(jsonData.greeting.state === 1)
        this.greetOutput.classList.remove('invisible');
        else this.greetOutput.classList.add('invisible');

        if (jsonData.greeting.position.toString() !== this.greetOutput.dataset.value) 
          {
            this.greetOutput.classList.remove('greeting');
            this.greetOutput.textContent = '';
            this.greetOutput.removeAttribute('id');
      
            const posList = document.querySelectorAll<HTMLElement>('li');
            for (const pos of posList) 
            {
              if (pos.dataset.value === jsonData.greeting.position.toString()) 
              {
                pos.setAttribute('id', 'tsGreet');
                pos.removeAttribute('class');
                pos.classList.add('greeting');
                this.greetOutput = pos;
                this.run();
              }
            }
          }
      }

    run(){

        const time : Date = new Date();
        const hours : number = time.getHours();
        let outStr : string = " "; 
        switch(hours){
            case 6:
            case 7:
            case 8:  
            case 9: 
            case 10: 
            case 11: 
                outStr = 'Доброе утро!';
                break;
            case 12:  
            case 13:  
            case 14:  
            case 15:  
            case 16:    
            case 17:
                outStr = 'Добрый день!';
                break;    
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23: 
                outStr = 'Добрый вечер!';
                break;
            case 0:    
            case 1:
            case 2: 
            case 3:
            case 4:
            case 5:    
                outStr = 'Доброй ночи!';
                break;
        }
        this.greetOutput.textContent = outStr;
    }
    
}

