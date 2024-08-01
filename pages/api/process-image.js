import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
    const inputImagePath = path.join(process.cwd(), 'public', 'input.png');
    const outputImagePath = path.join(process.cwd(), 'public', 'output.png');

    if (!fs.existsSync(inputImagePath)) {
        return res.status(404).json({ error: 'Input image not found' });
    }

    try {
        await sharp(inputImagePath)
            .resize(400)
            .rotate(90)
            .toFile(outputImagePath, (err, info) => {
                if (err) {
                    throw err;
                }
                console.log('Image processed successfully:', info);
            });

        res.status(200).json({ message: 'Image processed successfully', imagePath: '/output.png' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process image' });
    }
}