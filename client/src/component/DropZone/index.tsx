/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

interface IDropZone{
  image:string,
  setImage:Function,
}
const Dropzone: FC<IDropZone> = ({ image, setImage }) => {
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
  console.log(image);
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
          isDragActive
            ? <p>Drop the files here ...</p>
            : <p>Drag drop some files here, or click to select files</p>

        // image
        //   && <p>Drop the files here ...</p>
      }
    </div>
  );
};

export default Dropzone;
