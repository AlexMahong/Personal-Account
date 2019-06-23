import React from "react";
import ReactDOM from "react-dom";
import Nav from '@/components/Navbar'
class Home extends React.Component {
  render() {
    return (
      <div className="home" style={{paddingTop: '45px'}}>
        {<Nav/>}
        {this.props.children}
      </div>
    );
  }
}

export default Home;

