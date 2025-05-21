const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'public/assets/images/work');
const outputSizes = {
    xl: 1920,
    l: 1280,
    m: 800,
    s: 480,
    xs: 320
};

async function processImages() {
    const sizeSuffixes = Object.keys(outputSizes);

    const files = fs
        .readdirSync(inputDir)
        .filter(
            (file) =>
                /\.(jpe?g|png)$/i.test(file) &&
                !sizeSuffixes.some((suffix) => file.includes(`-${suffix}`))
        );

    for (const file of files) {
        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const inputPath = path.join(inputDir, file);
        const inputStat = fs.statSync(inputPath);

        for (const [suffix, width] of Object.entries(outputSizes)) {
            const outputWebP = path.join(inputDir, `${base}-${suffix}.webp`);
            const shouldProcessWebP =
                !fs.existsSync(outputWebP) ||
                fs.statSync(outputWebP).mtimeMs < inputStat.mtimeMs;

            if (suffix === 'xl') {
                const outputOriginal = path.join(
                    inputDir,
                    `${base}-${suffix}${ext}`
                );
                const shouldProcessOriginal =
                    !fs.existsSync(outputOriginal) ||
                    fs.statSync(outputOriginal).mtimeMs < inputStat.mtimeMs;

                if (shouldProcessOriginal) {
                    await sharp(inputPath)
                        .resize({ width })
                        .toFile(outputOriginal);
                    console.log(`Generated: ${base}-${suffix}${ext}`);
                }
            }

            if (shouldProcessWebP) {
                await sharp(inputPath)
                    .resize({ width })
                    .toFormat('webp')
                    .toFile(outputWebP);
                console.log(`Generated: ${base}-${suffix}.webp`);
            }
        }
    }
}

processImages();
