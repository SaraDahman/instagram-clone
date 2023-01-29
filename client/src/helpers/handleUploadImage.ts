export const handleUploadImage = async (acceptedFiles:any):Promise<any> => {
  const data = new FormData();
  data.append('file', acceptedFiles[0]);
  data.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
  data.append('cloud_name', `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
  const response = await fetch(`${process.env.REACT_APP_CLOUDINARY_BASE_URL}`, {
    method: 'post',
    body: data,
  });
  const result = await response.json();
  return result;
};
