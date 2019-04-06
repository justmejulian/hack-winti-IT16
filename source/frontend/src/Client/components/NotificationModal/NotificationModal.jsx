import React from 'react';
import { Button } from '@material-ui/core';
import posed, { PoseGroup } from 'react-pose';

import './NotificationModal.sass';

const NotificationModalContent = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 50 },
      default: { duration: 200 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

class NotificationModal extends React.Component {
  state = { isVisible: false };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        isVisible: !this.state.isVisible
      });
    }, 2000);
  }

  render() {
    const { isVisible } = this.state;

    return (
      <PoseGroup>
        {isVisible && [
          // If animating more than one child, each needs a `key`
          <Shade key='shade' className='shade' />,
          <NotificationModalContent key='modal' className='modal' />
        ]}
      </PoseGroup>
    );
  }
}

export default NotificationModal;
