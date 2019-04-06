import React from 'react';
import { Button } from '@material-ui/core';

import './RewardModal.sass';

const RewardModal = ({ visible, playAnimation, onClose }) => {
  return (
    <div>
      {visible && (
        <div className='modal'>
          <div className='modal-main'>
            <h2>Congratulations</h2>
            <Button onClick={() => playAnimation()}>Collect Rewards</Button>
            <Button onClick={() => onClose()}>Dismiss</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardModal;
