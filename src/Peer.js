import React from 'react';
import HoverableComponent from './Hoverable';


class Peer extends React.Component {
  render() {
    return (
        // create a hoverable component to reveal the peer id on hover.
        <HoverableComponent text ={this.props.username} altText={this.props.rkey}></HoverableComponent>
    );
  }
}

Peer.defaultProps = {
  username: '',
  rkey:'',
};
export default Peer;