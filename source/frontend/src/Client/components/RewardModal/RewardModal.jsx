import React from 'react';
import { Button } from '@material-ui/core';

import './RewardModal.sass';

const RewardModal = ({ isVisible, playAnimation, handleCloseModal }) => {
  return (
    <div>
      {isVisible && (
        <div className="modal">
          <div className="modal-main">
            <h2>Congratulations</h2>
            <Button onClick={() => playAnimation()}>Collect Rewards</Button>
            <Button onClick={handleCloseModal}>Dismiss</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardModal;
