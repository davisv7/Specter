import React from 'react';
import HoverableComponent from './Hoverable';


class Peer extends React.Component {
  render() {
    return (
        <HoverableComponent text ={this.props.username} altText={this.props.rkey}>
        </HoverableComponent>
//      <div className={`peer`}>
//          { this.props.username }
//      </div>
    );
  }
}

Peer.defaultProps = {
  username: '',
  rkey:'',
};
export default Peer;