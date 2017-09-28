import React, { Component } from 'react';
import './FileMainContainer.css';
import FileObjContainer from './FileObjContainer';

class FileMainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: ""
    }
    this.handleSelectedClick = this.handleSelectedClick.bind(this);
  }

  //to set state with the selected item (green)
  handleSelectedClick(e) {
    e.stopPropagation();
    let newSelected = e.currentTarget.id;
    this.setState({
      selected: newSelected
    });
  }

  render() {
    //create FileObjContainers for each fileObj, with appropriate info
    let fileObjContainers = this.props.children.map((fileObj, i) => {
      let hasChildren = fileObj.children !== undefined;
      return (
        <FileObjContainer
          key={this.props.level + "-" + i}
          id={this.props.level + "-" + i}
          level={this.props.level}
          parent={this.props.parent}
          data={fileObj}
          hasChildren={hasChildren}
          showVal="true"
          selectClick={this.handleSelectedClick}
          selected={this.state.selected}>
        </FileObjContainer>
      );
    });

    return (
      <div className="FileMainContainer">
        {fileObjContainers}
      </div>
    )
  }
}

export default FileMainContainer;
