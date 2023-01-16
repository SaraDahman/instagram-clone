import { ArrowsAltOutlined, SwitcherOutlined, ZoomInOutlined } from '@ant-design/icons';
import {
  Button, Dropdown, MenuProps, Popover, Slider, Tooltip,
} from 'antd';
import { FC, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

import './style.css';

const CropImage:FC<{imageTest:string}> = ({ imageTest }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [sizes, setSizes] = useState <number>(1 / 1);
  const [openZoom, setOpenZoom] = useState(false);
  const [openMultiPic, setOpenMultiPic] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState('');

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button onClick={() => { setSizes(4 / 3); }}>
          4 : 5
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button onClick={() => { setSizes(1 / 1); }}>
          1 : 1
          {' '}
        </Button>
      ),
    },
    {
      key: '3',
      label: (
        <Button onClick={() => { setSizes(16 / 9); }}>
          16 : 9
        </Button>
      ),
    },
  ];

  const handleOpenZoom = (newOpen: boolean):void => {
    setOpenZoom(newOpen);
  };

  const handleOpenMultiPic = (newOpen: boolean):void => {
    setOpenMultiPic(newOpen);
  };

  const onCropComplete = useCallback((croppedArea:any, croppedAreaPixels:any) => {
    const image = new Image();
    image.src = imageTest;
    image.crossOrigin = 'anonymous';

    // Get the canvas element from the DOM
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    // Draw the cropped image to the canvas
    const ctx :any = canvas.getContext('2d');
    ctx.drawImage(
      image,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );
    // Convert the canvas to a data URL
    const url = canvas.toDataURL();
    setCroppedImageUrl(url);
  }, []);

  console.log(croppedImageUrl);
  const onChange = (e: number):void => {
    setZoom(e);
  };

  return (
    <div>
      <div className="cropper-container">
        <Cropper
          image={imageTest}
          crop={crop}
          zoom={zoom}
          aspect={sizes}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          objectFit="vertical-cover"
        />
        <div className="actions">
          <div>
            <Dropdown menu={{ items }} placement="top" arrow>
              <Tooltip>
                <Button shape="circle" icon={<ArrowsAltOutlined className="cropper-icons" />} />
              </Tooltip>
            </Dropdown>

            <Popover
              content={(
                <div style={{ width: '100px' }}>
                  <Slider
                    onChange={onChange}
                    defaultValue={zoom}
                    min={1}
                    max={10}
                    handleStyle={{ color: 'red' }}
                    trackStyle={{ backgroundColor: '#000' }}
                  />
                </div>
              )}
              trigger="click"
              open={openZoom}
              onOpenChange={handleOpenZoom}
              className="pop-over"
              color="#262626cb"
            >
              <Tooltip>
                <Button
                  shape="circle"
                  style={{ marginLeft: '10px' }}
                  icon={<ZoomInOutlined className="cropper-icons" />}
                />
              </Tooltip>
            </Popover>
          </div>

          <Popover
            content={(
              <Button
                type="primary"
                onClick={() => { console.log('first'); }}
              >
                Click me
              </Button>
            )}
            trigger="click"
            open={openMultiPic}
            onOpenChange={handleOpenMultiPic}
            className="pop-over"
            color="#262626cb"
          >
            <Tooltip title="search">
              <Button
                shape="circle"
                icon={<SwitcherOutlined className="cropper-icons" />}
              />
            </Tooltip>
          </Popover>
        </div>
      </div>
    </div>

  );
};

export default CropImage;
