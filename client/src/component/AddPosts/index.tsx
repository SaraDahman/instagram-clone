import { Modal, Button, Divider } from 'antd';
import { FC, useState } from 'react';
import { Dropzone } from '..';

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
      >
        <h4 style={{ textAlign: 'center' }}>Create new post</h4>
        <Divider style={{ marginTop: '7px' }} />
        <div>
          <Dropzone setImage={setImage} image={image} />
        </div>
        {image && <img width="100%" src={image} alt="test" />}
      </Modal>
    </div>
  );
};

export default AddPosts;
