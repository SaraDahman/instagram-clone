export const handleCrop = (croppedAreaPixels:any, mainImage:string):string => {
  let url = '';
  try {
    const image = new Image();
    image.src = mainImage;
    image.crossOrigin = 'anonymous';

    // Get the canvas element from the DOM
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    // Draw the cropped image to the canvas
    const ctx: any = canvas.getContext('2d');
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
    url = canvas.toDataURL();
  } catch (error) {
    console.log(error);
  }
  return url;
};
