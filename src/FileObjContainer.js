import React, { Component } from 'react';
import './FileObjContainer.css';

class FileObjContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false,
      hover: false
    }
    this.handleClickContainer = this.handleClickContainer.bind(this);
    this.handleClickRow = this.handleClickRow.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  //to handle selecting one item (green highlighting) on click
  handleClickContainer(e) {
    this.props.selectClick(e);
  }

  //to handle expanding/contracting the container on click
  handleClickRow(e) {
    const currentStateExpanded = this.state.expanded;
    this.setState({
      expanded: !currentStateExpanded
    });
  }

  //to handle hover effects
  handleHover(e) {
    const currentStateHover = this.state.hover;
    this.setState({
      hover: !currentStateHover
    });
  }

  render() {
    let isPrivateClass = this.props.data.private ? "Private" : "Public";
    let hoverClass = this.state.hover ? "hover" : "";
    let hideClass = this.props.showVal !== "true" ? "hide" : "show";
    let selectedClass = this.props.selected === this.props.id ? "selected" : "";
    let expandImgClass = null;
    let showVal = null;
    let childFileObjContainers = null;
    if (this.props.hasChildren) {
      /*for folders with children, set the appropriate
      expand/collapse class for corresponding image depending on state (hover: white / non-hover: black; expanded: minus (to collapse) / collapsed: plus (to expand). Also, if expanded, set showVal to true to show sub-folders*/
      if (this.state.expanded) {
        showVal = "true";
        expandImgClass = this.state.hover || selectedClass !== "" ?
          "collapseImgWhite" :
          "collapseImgBlack";
      } else {
        showVal = "false";
        expandImgClass = this.state.hover || selectedClass !== "" ?
          "expandImgWhite" :
          "expandImgBlack";
      }
      /*for each sub/child fileObj, create FileObjContainers with appropriate info*/
      childFileObjContainers = this.props.data.children.map((fileObj, i) => {
        let hasChildren = fileObj.children !== undefined;
        let newLevel = +this.props.level + 1;
        let id = this.props.id + "/" + newLevel + "-" + i;
        return (
          <FileObjContainer
            key={id}
            id={id}
            level={newLevel}
            parent={this.props.id}
            data={fileObj}
            hasChildren={hasChildren}
            showVal={showVal}
            selectClick={this.props.selectClick}
            selected={this.props.selected}>
          </FileObjContainer>
        );
      });
    }

    //set indent divs to give appropriate indentation
    //depending on the level
    let indentDivs = [];
    for (let i = 1; i < this.props.level; i++) {
      indentDivs.push(<div className='indentDiv' key={i}></div>);
    }

    return (
      <div className={`FileObjContainer ${hideClass}`}
        key={this.props.id}
        id={this.props.id}
        onClick={this.handleClickContainer}>
        <div
          onMouseOver={this.handleHover}
          onMouseOut={this.handleHover}
          onClick={this.handleClickRow}
          className={`fileObjRow ${hoverClass} ${selectedClass}`}
        >
          {indentDivs}
          <div className={`fileObjExpand ${expandImgClass}`}>
          </div>
          <div className={`fileObjImg ${this.props.data.type}${isPrivateClass}`}>
          </div>
          <div className="fileObjName">
            {this.props.data.name}
          </div>
        </div>
        {childFileObjContainers}
      </div>
    )
  }
}

export default FileObjContainer;
