import React from 'react';
import Messages from './Messages';
import ChatInput from './ChatInput';
import IPFS from 'ipfs';
import Room from 'ipfs-pubsub-room';

require('./styles/ChatApp.css');



function repo() {
    return 'ipfs/pubsub-demo/' + Math.random()
}

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            info: null,
            room: null,

        };
        this.sendHandler = this.sendHandler.bind(this);


        this.ipfs = new IPFS({
            repo: repo(),
            EXPERIMENTAL: {
                pubsub: true
            },
            config: {
                Addresses: {
                    Swarm: [
                    '//dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
                }
            }
        })
        console.log('constructor');
    }


    componentWillMount() {
        console.log('componentwillmount');
                // now started to listen to room
            this.ipfs.once('ready', () => this.ipfs.id((err, info) => {
            this.room = Room(this.ipfs, 'room-name');

            //            setInterval(() => this.sendHandler('hey everyone!'), 2000);

            this.room.on('peer joined', (peer) => {
                // Notify Peer has Joined
                console.log(peer + ' has joined');
//                this.room.sendTo(peer, 'Hello ' + peer + '!');
            });

            this.room.on('peer left', (peer) => {
                // Notify Peer has Left
                console.log(peer + ' has left');
            });

            this.room.on('message', (new_message) => {
                //                console.log(this.ipfs);
                const message = JSON.parse(new_message.data.toString());
                if (!(message.username === this.props.username)) {
                    message.fromMe = false;
                    this.addMessage(message);
                }
                console.log(message.username, this.props.username);
            });

            // now started to listen to room
            this.room.on('subscribed', () => {
                console.log('Now connected!')
            });

        }))
    }






    sendHandler(message) {
        const messageObject = {
            username: this.props.username,
            message
        };

        messageObject.fromMe = true;
        this.addMessage(messageObject);

        this.room.broadcast(Buffer.from(JSON.stringify(messageObject)));
    }

    addMessage(message) {
        // Append the message to the component state
        const messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages
        });
    }

    render() {
        return ( <
            div className = "container" >
            <
            h3 > React Chat App < /h3>  <
            Messages messages = {
                this.state.messages
            }
            />  <
            ChatInput onSend = {
                this.sendHandler
            }
            />  < /
            div >
        );
    }

}
ChatApp.defaultProps = {
    username: 'Anonymous'
};

export default ChatApp;
