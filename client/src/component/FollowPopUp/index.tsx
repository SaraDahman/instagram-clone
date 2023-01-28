/* eslint-disable no-unused-vars */
import { FC } from 'react';
import Modal from 'react-modal';
import Person from './Person';
import './style.css';

const FollowPopUp:FC<{
  isOpen: boolean, setIsOpen:(val:boolean)=>void, type:string
}> = ({ isOpen, setIsOpen, type }):any => {
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
        },
      }}
    >
      <div className="content">
        <p className="type">{type}</p>
        <div className="people">
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
        </div>
      </div>
    </Modal>
  );
};

export default FollowPopUp;
