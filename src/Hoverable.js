import React from 'react';

class HoverableComponent extends React.Component {
   constructor(props) {
     super(props);
     this.state = { text : this.props.text }
   }
   //set the text
   onMouseover (e) {
     this.setState({text : this.props.altText})
   }
   //clear the text
   onMouseout (e) {
     this.setState({text : this.props.text})
   }
   render () {
       
       
       
       
       
      const {text} = this.state;
      return (
        <div 
          onMouseEnter={this.onMouseover.bind(this)}
          onMouseLeave={this.onMouseout.bind(this)}>{text}</div>
      )
   }
}

HoverableComponent.defaultProps = {
  text:'mouseoff',
    altText:'mouseon'
};


export default HoverableComponent;