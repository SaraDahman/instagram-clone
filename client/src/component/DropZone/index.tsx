/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';

import { Button } from 'antd';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { DropZoneIcon } from './icons';

import ImageLoading from '../ImageLoading/Loading';
import { ApiService } from '../../services';
import './style.css';

interface IDropZone{
  setImage:Function,
}

const Dropzone: FC<IDropZone> = ({ setImage }) => {
  const [isLoading, setIslLoading] = useState<boolean>(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*' as string,
    onDrop: async (acceptedFiles:any): Promise<void> => {
      if (acceptedFiles[0].path) {
        setIslLoading(true);
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        try {
          const { data } = await ApiService.post('/api/v1/upload/image/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setImage(data.image);
          setIslLoading(false);
        } catch (error) {
          setIslLoading(false);
        }
      }
    },
  } as unknown as DropzoneOptions);

  return (
    <div
      className="drop-zone-container"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <DropZoneIcon />
      {
          !isDragActive
            && <p className="drop-text">Drag photos and videos here</p>
      }
      <Button
        className="select-img-btn"
        type="primary"
      >
        select from computer
      </Button>
      {isLoading ? <ImageLoading /> : null }
    </div>
  );
};

export default Dropzone;
