import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class FileUpload extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className='FileUpload'>
        <h1>FileUpload</h1>
        <form
          ref='uploadForm'
          id='uploadForm'
          action='http://localhost:8080/upload'
          method='post'
          encType='multipart/form-data'
        >
          <input type='file' name='sampleFile' />

          <input type='submit' value='Upload!' />
        </form>
      </div>
    );
  }
}

export default FileUpload;
