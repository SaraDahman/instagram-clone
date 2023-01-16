/* eslint-disable react/jsx-props-no-spreading */
import { Button } from 'antd';
import { FC } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { DropZoneIcon } from './icons';
import './style.css';

interface IDropZone{
  setImage:Function,
}
const Dropzone: FC<IDropZone> = ({ setImage }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*' as string,
    onDrop: (acceptedFiles:any): void => {
      if (acceptedFiles[0].path) {
        const data = new FormData();
        data.append('file', acceptedFiles[0]);
        data.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
        data.append('cloud_name', `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
        fetch(`${process.env.REACT_APP_CLOUDINARY_BASE_URL}`, {
          method: 'post',
          body: data,
        })
          .then((resp) => resp.json())
          .then((result) => {
            setImage(result.url);
          })
          .catch((err) => console.log(err));
      }
    },
  } as unknown as DropzoneOptions);
  return (
    <div className="drop-zone-container" {...getRootProps()}>
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
    </div>
  );
};

export default Dropzone;
