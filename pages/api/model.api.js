const sharp = require('sharp');
const ort = require('onnxruntime-node');
const { createCanvas, loadImage } = require('canvas');

export const config = {
    api: {
        bodyParser: true,  // Default is true
    },
};

class Model {
    yolo_classes = ['1']

    constructor() { }

    async detect_objects_on_image(buf) {
        const [input, img_width, img_height] = await this.prepare_input(buf);
        const output = await this.run_model(input);
        return this.process_output(output, img_width, img_height);
    }

    async prepare_input(buf) {
        const img = sharp(buf);
        console.log('hrre');
        console.log(img);
        const md = await img.metadata();
        const [img_width, img_height] = [md.width, md.height];
        const pixels = await img.removeAlpha()
            .resize({ width: 640, height: 640, fit: 'fill' })
            .raw()
            .toBuffer();

        const red = [], green = [], blue = [];
        for (let index = 0; index < pixels.length; index += 3) {
            red.push(pixels[index] / 255.0);
            green.push(pixels[index + 1] / 255.0);
            blue.push(pixels[index + 2] / 255.0);
        }
        const input = [...red, ...green, ...blue];
        return [input, img_width, img_height];
    }

    async run_model(input) {
        const model = await ort.InferenceSession.create("./public/best.onnx");
        input = new ort.Tensor(Float32Array.from(input), [1, 3, 640, 640]);
        const outputs = await model.run({ images: input });
        return outputs["output0"].data;
    }

    iou(box1, box2) {
        return this.intersection(box1, box2) / this.union(box1, box2);
    }

    union(box1, box2) {
        const [box1_x1, box1_y1, box1_x2, box1_y2] = box1;
        const [box2_x1, box2_y1, box2_x2, box2_y2] = box2;
        const box1_area = (box1_x2 - box1_x1) * (box1_y2 - box1_y1)
        const box2_area = (box2_x2 - box2_x1) * (box2_y2 - box2_y1)
        return box1_area + box2_area - this.intersection(box1, box2)
    }

    intersection(box1, box2) {
        const [box1_x1, box1_y1, box1_x2, box1_y2] = box1;
        const [box2_x1, box2_y1, box2_x2, box2_y2] = box2;
        const x1 = Math.max(box1_x1, box2_x1);
        const y1 = Math.max(box1_y1, box2_y1);
        const x2 = Math.min(box1_x2, box2_x2);
        const y2 = Math.min(box1_y2, box2_y2);
        return (x2 - x1) * (y2 - y1)
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

        boxes = boxes.sort((box1, box2) => box2[5] - box1[5])
        const result = [];
        while (boxes.length > 0) {
            result.push(boxes[0]);
            boxes = boxes.filter(box => this.iou(boxes[0], box) < 0.8);
        }
        return result;
    }

    async analyze(detectImage) {
        let res = await this.detect_objects_on_image(detectImage);
        console.log(res)
        console.log(res.length)
        const img = await loadImage(detectImage);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0);

        for (const object of res) {
            const [x1, y1, x2, y2, label, prob] = object;
            ctx.strokeStyle = 'rgba(0, 255, 0, 1)';
            ctx.lineWidth = 2;
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.fillText(`Class: ${label}, Prob: ${prob.toFixed(2)}`, x1, y1 - 10);
        }

        const outputBuffer = canvas.toBuffer('image/png');
        return outputBuffer;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const detectImage = req.body.detectImage;
        console.log(detectImage);
        const base64Data = detectImage.split(',')[1];
        const buf = Buffer.from(base64Data, 'base64');
        let model = new Model();
        const output = await model.analyze(buf);

        res.status(200).json({ message: output });
    } else {
        // Handle other methods (e.g., GET, PUT) by sending a "Method Not Allowed" response
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}