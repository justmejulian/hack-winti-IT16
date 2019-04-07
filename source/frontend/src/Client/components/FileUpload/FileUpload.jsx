import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { B_URL } from '../../../config';

class FileUpload extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const uploadUrl = `${B_URL}/upload`;
    return (
      <div className="FileUpload">
        <h1>FileUpload</h1>
        <form
          ref="uploadForm"
          id="uploadForm"
          action={uploadUrl}
          method="post"
          encType="multipart/form-data"
        >
          <input type="file" name="sampleFile" />

          <input type="submit" value="Upload!" />
        </form>
      </div>
    );
  }
}

export default FileUpload;
