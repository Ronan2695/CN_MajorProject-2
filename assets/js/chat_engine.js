class ChatEngine{

    constructor(chatBoxId,userEmail){
        this.chatBox= $('#${chatBoxId}');
        this.userEmail=userEmail;

        this.socket= io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }
    }

    //creating a connection handler --> Will have to and fro interaction between server and client
    connectionHandler(){

        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets....!')


                self.socket.emit('join_room', {

                    user_email:self.userEmail,
                    chatroom:'codial'

                });
                
                self.socket.on('user_joined', function(data){
                    console.log('a user joined', data);

                })
        });

    }


}