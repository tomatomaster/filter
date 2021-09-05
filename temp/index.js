const sharpenForce = 1;
const kernel = [[0, -1 * sharpenForce, 0],
    [-1 * sharpenForce, (4 * sharpenForce) + 1, -1 * sharpenForce],
    [0, -1 * sharpenForce, 0]];
function UnsharpMask(rawImage) {
    const pixel = rawImage.data;
    const img = new ImageData(rawImage.width, rawImage.height);
    const width = rawImage.width;
    for (let h = 1; h < rawImage.height - 1; h++) {
        for (let w = 1; w < rawImage.width - 1; w++) {
            let nR = 0;
            let nG = 0;
            let nB = 0;
            for (let hk = -1; hk < 2; hk++) {
                for (let wk = -1; wk < 2; wk++) {
                    const position = ((h + hk) * width + (w + wk)) * 4;
                    const r = pixel[position + 0];
                    const g = pixel[position + 1];
                    const b = pixel[position + 2];
                    nR += kernel[hk + 1][wk + 1] * r;
                    nG += kernel[hk + 1][wk + 1] * g;
                    nB += kernel[hk + 1][wk + 1] * b;
                }
            }
            const position = (h * width + w) * 4;
            img.data[position + 0] = nR;
            img.data[position + 1] = nG;
            img.data[position + 2] = nB;
            img.data[position + 3] = pixel[position + 3];
        }
    }
    return img;
}
export default UnsharpMask;
