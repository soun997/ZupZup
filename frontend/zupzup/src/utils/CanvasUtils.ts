const IMAGE_MIME_TYPE = 'image/jpeg';

function canvasToFile(fileName: string, canvas: HTMLCanvasElement): File {
  const blob = dataURLtoBlob(canvas.toDataURL(IMAGE_MIME_TYPE));
  return new File([blob], fileName, {
    type: IMAGE_MIME_TYPE,
  });
}

const dataURLtoBlob = (dataURL: string) => {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export { canvasToFile };
