import React, { Component } from 'react';

import './FileUpload.sass';

class FileUpload extends Component {
  state = {};

  handleChange = (event, value) => {
    this.setState({ value });
  };

  sendRequest = file => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
          resolve(req.responseText);
        }
      };

      const formData = new FormData();
      formData.append('file', file, file.name);

      req.open('POST', 'http://localhost:8080/upload');
      req.send(formData);
    });
  };

  onFormSubmit = async e => {
    e.preventDefault();

    console.log(this.state.file);

    const responseText = await this.sendRequest(this.state.file);

    console.log(responseText);

    this.setState({ url: responseText });

    // ref='uploadForm'
    // id='uploadForm'
    // action='http://localhost:8080/upload'
    // method='post'
    // encType='multipart/form-data'

    // let formData = new FormData();
    // console.log(this.state.file);

    // formData.append('myImage', this.state.file);

    // console.log(formData.values);

    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // };
    // axios
    //   .post('http://localhost:8080/upload', this.state.file, config)
    //   .then(response => {
    //     alert('The file is successfully uploaded');
    //   })
    //   .catch(error => {});
  };

  onChange = e => {
    console.log(e.target.files);

    this.setState({ file: e.target.files[0] });
  };

  render() {
    return (
      <div className='FileUpload'>
        <h1>FileUpload</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type='file' name='sampleFile' onChange={this.onChange} />

          <input type='submit' value='Upload!' />

          <p>
            File uploaded to:{' '}
            <a href={'file://' + this.state.url}>{this.state.url}</a>
          </p>
        </form>
      </div>
    );
  }
}

export default FileUpload;
