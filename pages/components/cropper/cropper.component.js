import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from './cropper.module.css';
import Modal from "../modal/modal.component";
import Pica from 'pica';
import * as ort from 'onnxruntime-web';

export default function RealCropper({ imageSrc }) {
  const [modelData, setModelData] = useState("#");
  const [amount, setAmount] = useState("#");
  const [showCroppedModal, setShowCroppedModal] = useState(false);
  const cropperRef = useRef(null);

  const getCropData = async () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      await detectOffline(croppedCanvas.toDataURL());
      toggleCroppedModal();
    }
  };

  async function analyzeImage(detectImage) {
    console.log(detectImage);
    const base64Data = detectImage.split(',')[1];
    const buf = Buffer.from(base64Data, 'base64');
    let model = new Model();
    const [output, amount] = await model.analyze(buf);
    return { message: output, amount: amount }
  }

  // const detect = async (cropData) => {
  //   const response = await fetch('/api/model.api', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ 'detectImage': cropData })
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     const amount = data.amount;
  //     const buf = Buffer.from(data.message);
  //     const base64Image = buf.toString('base64');
  //     const imageSrc = `data:image/png;base64,${base64Image}`;
  //     setModelData(imageSrc);
  //     setAmount(amount)
  //   } else {
  //     console.error('Error:', response.status, response.statusText);
  //   }
  // }

  const detectOffline = async (cropData) => {
    const data = await analyzeImage(cropData)
    const amount = data.amount;
    // const buf = Buffer.from(data.message);
    // const base64Image = buf.toString('base64');
    // const imageSrc = `data:image/png;base64,${base64Image}`;
    const imageSrc = data.message;
    setModelData(imageSrc);
    setAmount(amount)
  }

  const toggleCroppedModal = () => {
    setShowCroppedModal(!showCroppedModal);
  }

  return (
    <div className={styles.cropperContainer}>
      <div className={styles.cropperContainer__cropperWrapper}>
        <Cropper
          ref={cropperRef}
          className={styles.cropperContainer__cropper}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={imageSrc}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
      </div>
      <div className={styles.cropperContainer__resultWrapper}>
        <button className={styles.cropperContainer__cropButton} onClick={getCropData}>
          Analyze
        </button>
        <Modal show={showCroppedModal} onClose={toggleCroppedModal}>
          <div className={styles.cropperContainer}>
            <h1 className={styles.cropperContainer__title}>Analyzed image</h1>
            <h2 className={styles.cropperContainer__countPipes}>Pipes Count: {amount}</h2>
            <div className={styles.cropperContainer__wrapper}>
              {modelData && <img className={styles.cropperContainer__croppedImage} src={modelData} alt="cropped" />}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export class Model {
  yolo_classes = ['1'];
  model = false;

  constructor() { }

  async detect_objects_on_image(buf) {
    const [input, img_width, img_height] = await this.prepare_input(buf);
    const output = await this.run_model(input);
    return this.process_output(output, img_width, img_height);
  }

  async prepare_input(buf) {
    const pica = new Pica();

    // Create an image element
    const img = new Image();
    img.src = `data:image/png;base64,${buf.toString('base64')}`; // Convert buffer to Base64

    await new Promise((resolve) => {
      img.onload = () => resolve();
    });

    // Create a canvas to resize the image
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;

    // Resize the image
    await pica.resize(img, canvas);

    // Get the image data
    const imageData = canvas.getContext('2d').getImageData(0, 0, 640, 640);
    const pixels = imageData.data;

    // Arrays for red, green, and blue channels
    const red = [];
    const green = [];
    const blue = [];

    // Loop through the pixel data (without alpha channel)
    for (let index = 0; index < pixels.length; index += 4) {
      red.push(pixels[index] / 255.0);     // Red channel
      green.push(pixels[index + 1] / 255.0); // Green channel
      blue.push(pixels[index + 2] / 255.0); // Blue channel
    }

    // Combine the channels into one input array
    const input = [...red, ...green, ...blue];

    return [input, img.width, img.height]; // Return the original image dimensions
  }

  async run_model(input) {
    if (!this.model) {
      this.model = await ort.InferenceSession.create('./best.onnx');
    }
    input = new ort.Tensor('float32', Float32Array.from(input), [1, 3, 640, 640]);
    const outputs = await this.model.run({ images: input });
    return outputs['output0'].data;
  }

  iou(box1, box2) {
    return this.intersection(box1, box2) / this.union(box1, box2);
  }

  union(box1, box2) {
    const [box1_x1, box1_y1, box1_x2, box1_y2] = box1;
    const [box2_x1, box2_y1, box2_x2, box2_y2] = box2;
    const box1_area = (box1_x2 - box1_x1) * (box1_y2 - box1_y1);
    const box2_area = (box2_x2 - box2_x1) * (box2_y2 - box2_y1);
    return box1_area + box2_area - this.intersection(box1, box2);
  }

  intersection(box1, box2) {
    const [box1_x1, box1_y1, box1_x2, box1_y2] = box1;
    const [box2_x1, box2_y1, box2_x2, box2_y2] = box2;
    const x1 = Math.max(box1_x1, box2_x1);
    const y1 = Math.max(box1_y1, box2_y1);
    const x2 = Math.min(box1_x2, box2_x2);
    const y2 = Math.min(box1_y2, box2_y2);
    return (x2 - x1) * (y2 - y1);
  }

  process_output(output, img_width, img_height) {
    let boxes = [];
    for (let index = 0; index < 8400; index++) {
      const [class_id, prob] = [...Array(1).keys()]
        .map(col => [col, output[8400 * (col + 4) + index]])
        .reduce((accum, item) => item[1] > accum[1] ? item : accum, [0, 0]);
      if (prob < 0.5) {
        continue;
      }
      const label = this.yolo_classes[class_id];
      const xc = output[index];
      const yc = output[8400 + index];
      const w = output[2 * 8400 + index];
      const h = output[3 * 8400 + index];
      const x1 = (xc - w / 2) / 640 * img_width;
      const y1 = (yc - h / 2) / 640 * img_height;
      const x2 = (xc + w / 2) / 640 * img_width;
      const y2 = (yc + h / 2) / 640 * img_height;
      boxes.push([x1, y1, x2, y2, label, prob]);
    }

    boxes = boxes.sort((box1, box2) => box2[5] - box1[5]);
    const result = [];
    while (boxes.length > 0) {
      result.push(boxes[0]);
      boxes = boxes.filter(box => this.iou(boxes[0], box) < 0.8);
    }
    return result;
  }

  async analyze(detectImage) {
    const res = await this.detect_objects_on_image(detectImage);
    console.log(res);
    const amount = res.length;

    // Create an image element for overlay
    const img = new Image();
    img.src = `data:image/png;base64,${detectImage.toString('base64')}`;
    await new Promise((resolve) => {
      img.onload = () => resolve();
    });

    // Create a canvas for drawing
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    // Draw the original image
    ctx.drawImage(img, 0, 0);

    // Draw each detected object on the canvas
    for (const [x1, y1, x2, y2, label, prob] of res) {
      ctx.strokeStyle = 'rgba(0, 255, 0, 1)'; // Green color for bounding box
      ctx.lineWidth = 2;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1); // Draw rectangle

      // Draw the label text
      ctx.fillStyle = 'red';
      ctx.fillText(`Class: ${label}, Prob: ${prob.toFixed(2)}`, x1, y1 - 5);
    }

    // Get the output buffer as PNG
    const outputBuffer = canvas.toDataURL('image/png');

    return [outputBuffer, amount];
  }
}