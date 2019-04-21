import React from 'react';

import Peer from './Peer';
import Collapsible from 'react-collapsible';


class Peers extends React.Component {

  render() {
    // Loop through all the messages in the state and create a Message component
    const peers = this.props.peers.map((peer, i) => {
        return (
          <Peer
            key={i}
            username={peer.username}
            rkey = {peer.rkey}/>
        );
      });
    return (
      <Collapsible trigger= {peers.length.toString().concat("Peers")}>
          <div className='peers' id='peerList'>
            { peers }
          </div>
      </Collapsible>
    );
  }
}

Peers.defaultProps = {
  peers: []
};

export default Peers;