const app = new Vue({
    el: '#app',
    data: {
     title: 'Nestjs Websockets Chat',
     name: '',
     text: '',
     messages: [],
     socket: null
    },
    methods: {
     sendMessage() {
      if(this.validateInput()) {
       const message = {
       name: this.name,
       text: this.text
      }
      this.socket.emit('msgToServer', message)
      this.text = ''
     }
    },
    receivedMessage(message) {
     this.messages.push(message)
    },
    validateInput() {
     return this.text.length > 0
    }
   },
    created() {
     this.socket = io('http://localhost:3000')
     
     let uri = window.location.href.split('?');
    if(uri.length == 2) {
      let vars = uri[1].split('&');
      let getVars = {};
      let tmp = '';
      vars.forEach(function(v) {
        tmp = v.split('=');
        if(tmp.length == 2)
          getVars[tmp[0]] = tmp[1];
      });
      console.log(getVars['test']);
      // do 
    }

        this.socket.emit('JoinRoom', getVars['test'])
     this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
     })
    }
   })