import sharp from 'sharp';
import * as ort from 'onnxruntime-node';

// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

export class Model {
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
        const model = await ort.InferenceSession.create("./best.onnx");
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
        const res = await this.detect_objects_on_image(detectImage);
        console.log(res);
        const amount = res.length;

        // Загружаем изображение
        const image = sharp(detectImage);
        const metadata = await image.metadata();

        // Create an overlay with transparent background
        let overlay = sharp({
            create: {
                width: metadata.width,
                height: metadata.height,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
            }
        });

        // Initialize an array to hold all the SVG inputs
        const svgInputs = [];

        // Draw each object on the image
        for (const [x1, y1, x2, y2, label, prob] of res) {
            const width = x2 - x1;
            const height = y2 - y1;

            // Create rectangles and text labels
            const svg = `
                <svg width="${metadata.width}" height="${metadata.height}">
                    <rect x="${x1}" y="${y1}" width="${width}" height="${height}" 
                          style="fill:none;stroke:rgba(0,255,0,1);stroke-width:2" />
                    <text x="${x1}" y="${y1 - 5}" font-size="14" fill="rgba(255,0,0,1)">
                        Class: ${label}, Prob: ${prob.toFixed(2)}
                    </text>
                </svg>`;

            // Push each SVG buffer into the array
            svgInputs.push(Buffer.from(svg));
        }

        // Create composite input array for all SVGs
        const compositeInputs = svgInputs.map(svgBuffer => ({
            input: svgBuffer,
            top: 0,
            left: 0,
        }));

        // Composite all SVG inputs onto the overlay
        overlay = overlay.composite(compositeInputs);

        // Combine the original image and the overlay
        const overlayBuffer = await overlay.png().toBuffer();
        const outputBuffer = await image
            .composite([{ input: overlayBuffer, blend: 'over' }])
            .png()
            .toBuffer();
        return [outputBuffer, amount];
    }
}

export async function analyzeImage(detectImage) {
    console.log(detectImage);
    const base64Data = detectImage.split(',')[1];
    const buf = Buffer.from(base64Data, 'base64');
    let model = new Model();
    const [output, amount] = await model.analyze(buf);
    return { message: output, amount: amount }
}

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const detectImage = req.body.detectImage;
//         console.log(detectImage);
//         const base64Data = detectImage.split(',')[1];
//         const buf = Buffer.from(base64Data, 'base64');
//         let model = new Model();
//         const [output, amount] = await model.analyze(buf);

//         res.status(200).json({ message: output, amount: amount });
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// }