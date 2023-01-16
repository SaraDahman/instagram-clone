import { Modal, Button, Divider } from 'antd';
import { FC, useState } from 'react';
import { Dropzone } from '..';
import CropImage from '../CropImage';
import { BackIcon } from './icons';
import './style.css';

const AddPosts:FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string>('');

  const showModal = ():void => {
    setIsModalOpen(true);
  };

  const handleOk = ():void => {
    setIsModalOpen(false);
  };

  const handleCancel = ():void => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        closable={false}
        className="add-post-modal"
      >
        <div className="add-post-modal-title">
          {image && <BackIcon />}
          <p>Create new post</p>
          { image && <Button type="link">Next</Button>}

        </div>

        <Divider style={{ marginTop: '7px' }} />
        {image
          ? (
            <CropImage imageTest={image} />
          ) : (
            <div>
              <Dropzone setImage={setImage} />
            </div>
          )}

      </Modal>
    </div>
  );
};

export default AddPosts;
