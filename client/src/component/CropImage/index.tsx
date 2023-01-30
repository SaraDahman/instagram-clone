/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-props-no-spreading */
import {
  FC, useState, useCallback, useEffect, useRef,
} from 'react';

import {
  Button, Dropdown, MenuProps, Popover, Tooltip,
} from 'antd';
import {
  ArrowsAltOutlined, SwitcherOutlined, PlusOutlined, CloseCircleFilled,
} from '@ant-design/icons';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import SliderSlick from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import ImageLoading from '../ImageLoading/Loading';
import { handleCrop } from './handleCrop';
import { ICropProps } from '../../interfaces';
import { ApiService } from '../../services';
import './style.css';

const CropImage: FC<ICropProps> = ({
  mainImage, setMainImage, openMultiPic, setOpenMultiPic,
  sliderImages, setSliderImages,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [sizes, setSizes] = useState<number>(1 / 1);
  const [, setCroppedImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sliderWidth, setSliderWidth] = useState<number>(180);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const fileInputRef = useRef<any>(null);
  // Add main image to slider of images
  useEffect(() => {
    if (!sliderImages?.includes(mainImage)) {
      setSliderImages((prev) => {
        prev[0] = mainImage;
        return prev;
      });
    }
  }, []);

  // Drag and drop functionality
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as string,
    onDrop: async (acceptedFiles: any): Promise<void> => {
      if (acceptedFiles[0].path) {
        const formData = new FormData();
        setIsLoading(true);
        formData.append('file', acceptedFiles[0]);
        try {
          const { data } = await ApiService.post('/api/v1/upload/image/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setSliderImages((prev) => {
            setIsLoading(false);
            prev.unshift(data.image);
            return prev;
          });
        } catch (error) {
          setIsLoading(false);
          toast.error('Failed to upload the image');
        }

        if (slidesToShow < 3) {
          setSlidesToShow(slidesToShow + 1);
          setSliderWidth(sliderWidth + 180);
        }

        if (slidesToShow === 4) {
          setSliderWidth(sliderWidth - 150);
        }
      }
    },
  } as unknown as DropzoneOptions);

  // for resize the image
  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    try {
      const url = handleCrop(croppedAreaPixels, mainImage);
      setCroppedImageUrl(url);
    } catch (error) {
      toast.error('Failed to get the image');
    }
  }, []);

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

  return (
    <div>
      <div className="cropper-container">
        <Cropper
          image={mainImage}
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

          </div>

          <Popover
            placement="topRight"
            content={(
              <div className="slider-container-popover" style={{ width: `${sliderWidth}px` }}>

                <SliderSlick
                  infinite={false}
                  speed={500}
                  slidesToShow={slidesToShow}
                  slidesToScroll={1}
                  accessibility
                  dots
                  arrows={sliderImages.length > 3}
                  nextArrow={<NextArrow />}
                  prevArrow={<PrevArrow />}
                  className="slider-add-post"
                >
                  {
                    sliderImages.map((image) => (
                      <div key={uuidv4()} className="image-container">
                        {/*  This button to delete an image from the slider */}
                        <button
                          type="button"
                          className="button-slider"
                          onClick={() => {
                            // get the index of the next image
                            const indexOfPreviousImage = sliderImages.indexOf(image) + 1;
                            // if the deleted image is the main image
                            if (image === mainImage) {
                              // change the main image to the previous one or to the next one.
                              setMainImage(sliderImages[indexOfPreviousImage]
                                ? sliderImages[indexOfPreviousImage]
                                : sliderImages[indexOfPreviousImage - 2]);
                            }

                            // delete it
                            setSliderImages((prev) => prev.filter((img) => img !== image));

                            if (sliderImages.length <= 3) {
                              setSlidesToShow(slidesToShow - 1);
                            }
                            if (sliderImages.length <= 3) {
                              setSliderWidth(sliderWidth - 150);
                            }
                          }}
                        >
                          <CloseCircleFilled />
                        </button>
                        <img
                          key={uuidv4()}
                          src={image}
                          alt=""
                          style={{ marginRight: '0px' }}
                          onClick={() => {
                            setMainImage(image);
                          }}
                          onKeyDown={() => {
                            setMainImage(image);
                          }}
                          role="presentation"
                        />
                      </div>

                    ))
                  }

                </SliderSlick>
                <div className="slider-input-container">
                  <div>
                    <input
                      {...getInputProps()}
                      {...getRootProps()}
                      type="primary"
                      style={{
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'inherit',
                        position: 'absolute',
                      }}
                      disabled={isLoading || sliderImages.length === 10}
                    />
                    <PlusOutlined style={{ color: 'wheat', fontSize: '18px' }} />
                  </div>
                  {isLoading ? <ImageLoading /> : null}

                </div>
              </div>

            )}
            trigger="click"
            open={openMultiPic}
            onOpenChange={(isVisible) => setOpenMultiPic(isVisible)}
            className="pop-over"
            color="#262626cb"
          >
            <Tooltip title="search">
              <Button
                ref={fileInputRef}
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
