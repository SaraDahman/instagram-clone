import {
  FC, useState, useContext, useEffect,
} from 'react';
import {
  Modal, Button, Image, Divider,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Dropzone } from '..';

import CropImage from '../CropImage';
import { BackIcon } from './icons';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const AddPosts:FC = () => {
  const context = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCaptionOpen, setIsCaptionOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');

  const showModal = ():void => {
    setIsModalOpen(true);
  };

  const handleOk = ():void => {
    setIsModalOpen(false);
  };

  const handleCancel = ():void => {
    setIsModalOpen(false);
    setIsCaptionOpen(false);
  };

  useEffect(() => {
    if (!image) {
      setIsCaptionOpen(false);
    }
  }, [image]);
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        className="add-post-modal"
        width={isCaptionOpen ? 1000 : 700}
      >
        <div className="add-post-modal-title">
          {image && (
          <Button
            onClick={() => {
              setIsCaptionOpen(false);
            }}
            style={{ border: 'none' }}
            icon={<BackIcon />}
          />
          )}
          <p>Create new post</p>
          { image && (
            <Button type="link" onClick={() => { setIsCaptionOpen(true); }}>
              { isCaptionOpen ? 'Share' : 'Next' }
            </Button>
          )}
        </div>
        <Divider />
        <div style={{ display: 'flex', marginTop: '0px' }}>

          <div style={{ width: isCaptionOpen ? '65%' : '100%' }}>
            {image
              ? (
                <CropImage mainImage={image} setMainImage={setImage} />
              ) : (
                <div>
                  <Dropzone setImage={setImage} />
                </div>
              )}

          </div>
          {isCaptionOpen ? (
            <div style={{ width: '40%' }}>
              <div className="add-post-caption-username">
                <Image width="50px" src={context?.user?.image} />
                <p>{context?.user?.username}</p>
              </div>
              <TextArea
                showCount
                bordered={false}
                maxLength={2200}
                style={{
                  height: 180,
                  resize: 'none',
                  border: 'none',
                  padding: '7px',
                }}
                placeholder="Write a caption"
              />
            </div>
          ) : null}
        </div>

      </Modal>
    </div>
  );
};

export default AddPosts;
