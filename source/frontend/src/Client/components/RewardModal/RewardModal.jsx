import React from 'react';
import { Button } from '@material-ui/core';

import './RewardModal.sass';

const RewardModal = ({ values, isVisible, fowardToGame, handleCloseModal }) => {
  return (
    <div>
      {isVisible && (
        <div className='modal'>
          <div className='modal-main'>
            <h1>{values.eventname}</h1>
            <p>{values.detail}</p>
            <div className='btns'>
              <Button variant='outlined' onClick={() => fowardToGame()}>
                I am Ready!
              </Button>
              <Button variant='outlined' onClick={handleCloseModal}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardModal;
