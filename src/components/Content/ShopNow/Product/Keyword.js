import React from "react";
import { connect } from "react-redux";
import "../../../../assets/css/category.css";

const mapStateToProps = (state) => ({
  history: state.history.history,
});

class Keyword extends React.Component {
  state = {};

  searchByKeywords = (e) => {
    let { value } = this.props.item;
    if ((e.key && e.key !== "Enter") || value == "") {
      return;
    }
    this.props.history.push({
      pathname: "/shopnow/search",
      search: `?q=${value}`,
    });
  };

  render() {
    let { color, value } = this.props.item;
    return (
      <div onClick={this.searchByKeywords} className={color}>
        <p className="kw-text">{value}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(Keyword);
