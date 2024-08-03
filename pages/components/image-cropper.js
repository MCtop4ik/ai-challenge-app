import { useState, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ onCrop }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imageElement = useRef(null);
  const cropper = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
      if (cropper.current) {
        cropper.current.destroy();
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const initializeCropper = () => {
    cropper.current = new Cropper(imageElement.current, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      crop: () => {
        const canvas = cropper.current.getCroppedCanvas();
        onCrop(canvas.toDataURL());
      },
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imageSrc && (
        <div>
          <img
            ref={imageElement}
            src={imageSrc}
            alt="Source"
            onLoad={initializeCropper}
            style={{ maxWidth: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;