import {
  FC, useState, useContext, useEffect,
} from 'react';

import {
  Modal, Button, Image, Divider,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { toast } from 'react-toastify';
import { Dropzone } from '..';

import CropImage from '../CropImage';
import { BackIcon } from './icons';
import { AuthContext } from '../../context/AuthContext';
import { ApiService } from '../../services';
import './style.css';

const AddPosts:FC = () => {
  const context = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCaptionOpen, setIsCaptionOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [openMultiPic, setOpenMultiPic] = useState(false);
  const [caption, setCaption] = useState<string>('');
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  const showModal = ():void => {
    setIsModalOpen(true);
  };

  const handleOk = ():void => {
    setIsModalOpen(false);
    setOpenMultiPic(false);
  };

  const handleCancel = ():void => {
    setIsModalOpen(false);
    setIsCaptionOpen(false);
    setOpenMultiPic(false);
  };

  const handleRequest = async () :Promise<void> => {
    try {
      const result = await ApiService.post('/api/v1/posts/', { caption, media: sliderImages });
      toast.success(result.data.message);
      setSliderImages([]);
      setCaption('');
      setIsModalOpen(false);
      setImage('');
    } catch (error:any) {
      toast.error(error.response.message[0]);
    }
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
              if (isCaptionOpen) {
                setIsCaptionOpen(false);
              } else {
                setIsModalOpen(false);
              }
            }}
            style={{ border: 'none' }}
            icon={<BackIcon />}
          />
          )}
          <p>Create new post</p>
          { image && (
            <Button
              type="link"
              onClick={() => {
                if (!isCaptionOpen) {
                  setIsCaptionOpen(true);
                  setOpenMultiPic(false);
                } else handleRequest();
              }}
            >
              { isCaptionOpen ? 'Share' : 'Next' }
            </Button>
          )}
        </div>
        <Divider />
        <div style={{ display: 'flex', marginTop: '0px' }}>

          <div style={{ width: isCaptionOpen ? '65%' : '100%' }}>
            {image
              ? (
                <CropImage
                  mainImage={image}
                  setMainImage={setImage}
                  openMultiPic={openMultiPic}
                  setOpenMultiPic={setOpenMultiPic}
                  sliderImages={sliderImages}
                  setSliderImages={setSliderImages}
                />
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
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
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
