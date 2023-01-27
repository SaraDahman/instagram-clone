/* eslint-disable no-unused-vars */
import { FC } from 'react';
import Modal from 'react-modal';

const FollowPopUp:FC<{
  isOpen: boolean, setIsOpen:(val:boolean)=>void
}> = ({ isOpen, setIsOpen }):any => {
  const handleCancel = ():void => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          width: '25%',
          height: '400px',
          position: 'static',
          padding: 'auto',
          // overflow: 'auto',
        },
      }}
    >
      <div>
        <p>Following</p>
        <div className="people">
          <p>test</p>
        </div>
      </div>
    </Modal>
  );
};

export default FollowPopUp;
