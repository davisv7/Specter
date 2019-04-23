import React from 'react';
import Messages from './Messages';
import ChatInput from './ChatInput';
import Peers from './Peers';
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
            ready:false,
            identity:null,
            messages: [],
            info: null,
            room: null,
            peers:[]
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
                    "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star",
                    ]
                }
            }
        })
    }


    componentWillMount() {

                // now started to listen to room
        try{
            this.ipfs.once('ready', () => this.ipfs.id((err, info) => {
                this.setState({
                    info,
                    ready:true,
                    identity:info.id
                })
            this.room = Room(this.ipfs, 'room-name');

            //            setInterval(() => this.sendHandler('hey everyone!'), 2000);

            this.room.on('peer joined', (peer) => {
                // Notify Peer has Joined
                console.log(peer + ' has joined');
                this.addPeer(peer);
                const messageObject = {
                    username: this.props.username,
                    message:"hello " +peer+'!'
                };
                this.room.sendTo(peer, Buffer.from(JSON.stringify(messageObject)));
            });

            this.room.on('peer left', (peer) => {
                // Notify Peer has Left
                console.log(peer + ' has left');
                this.removeMessages(peer);
                this.removePeer(peer);
            });

            this.room.on('message', (new_message) => {
                const message = JSON.parse(new_message.data.toString());
                if (message.rkey === this.state.identity) {
                    message.fromMe = true;
                    this.addMessage(message);
                    return;

                }
                else if(new_message.from !== message.username ){
                    message.fromMe = false;
                    this.addMessage(message);
                    this.removePeer(new_message.from);
                    this.addPeer(new_message.from,message)
                }

            });

            // now started to listen to room
            this.room.on('subscribed', () => {
                console.log('Now connected!')
            });

        }))
    }  catch(err) {
            console.error('Failed to initialize peer', err)
        
        }
    }
    
    
    removePeer(peer){
        const peers = this.state.peers.filter((pear, index, arr)=>{
            return pear.rkey !== peer;
        });
        this.setState({
            peers
        });
    }
    
    removeMessages(peer){
        
        const actualPeer = this.state.peers.find((pear, index, array) =>{
            return (pear.rkey === peer);
        });
        
        const messages = this.state.messages.filter((message, index, arr)=>{
            return message.username !== actualPeer.username;
        });
        
        this.setState({
            messages
        });
    }



    sendHandler(message) {
        const messageObject = {
            username: this.props.username,
            rkey: this.state.info.id,
            message
        };

        messageObject.fromMe = true;
//        this.addMessage(messageObject);
        if (this.state.ready){
            this.room.broadcast(Buffer.from(JSON.stringify(messageObject)));

        }
    }

    addMessage(message) {
        // Append the message to the component state
        const messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages
        });
    }
    
    addPeer(peer,message=0){
        var peers = this.state.peers;
        var peerObject={};
        if (message!==0){
            peerObject = {
            rkey: peer,
            username:message.username 
            };
        } else {
            peerObject = {
                rkey: peer,
                username: peer
            };
        }
        peers.push(peerObject);
        this.setState({
            peers
        });
    }
    
    

    render() {
        return ( <div className = "container" >
            <h3 > Specter Distributed Chat < /h3>
            <Peers peers = {
                this.state.peers
                } />
            <Messages messages = {
                this.state.messages
            }/>
            <ChatInput onSend = {
                this.sendHandler
            }/> 
                </div>
        );
    }

}
ChatApp.defaultProps = {
    username: 'Anonymous'
};

export default ChatApp;
