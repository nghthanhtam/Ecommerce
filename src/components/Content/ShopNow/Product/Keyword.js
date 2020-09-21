import React from "react";
import "../../../../assets/css/category.css";

class Keyword extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    let { color } = this.props.item;
    return (
      <div className={color}>
        <p className="kw-text">captain america</p>
      </div>
    );
  }
}

export default Keyword;
