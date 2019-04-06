import React, { Component } from 'react';

import './FormHeader.sass';

import logo from '../../../Shared/assets/img/logo.png';
import mobileLogo from '../../../Shared/assets/img/mobile_logo.png';

class FormHeader extends Component {
  state = {};
  render() {
    return (
      <div className='FormHeader'>
        <h1>Social Helper</h1>
        <img src={mobileLogo} alt='Logo' />
      </div>
    );
  }
}

export default FormHeader;
