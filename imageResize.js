const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Define the path to the original images folder
const sourceFolder = path.join(
	__dirname,
	"src",
	"assets",
	"images",
	"resources"
);

// Define the output folder for resized images
const outputFolder = path.join(__dirname, "src", "assets", "images", "resized");

// Define the desired widths for resizing
const widths = [300, 768, 1024, 1536];

// Ensure the output folder exists, create it if it doesn't
if (!fs.existsSync(outputFolder)) {
	fs.mkdirSync(outputFolder, { recursive: true });
}

// Read the list of files in the source folder
fs.readdir(sourceFolder, (err, files) => {
	if (err) {
		console.error(`Error reading directory: ${err.message}`);
		return;
	}

	// Loop through each file
	files.forEach((filename) => {
		const originalPath = path.join(sourceFolder, filename);

		// Check if the file is an image (you can add more supported formats if needed)
		if (filename.match(/\.(jpg|jpeg|png|gif)$/i)) {
			// Process the image for each desired width
			widths.forEach((width) => {
				const resizedFilename = `${path.basename(
					filename,
					path.extname(filename)
				)}-${width}px${path.extname(filename)}`;
				const outputPath = path.join(outputFolder, resizedFilename);

				// Check if the resized image already exists
				if (!fs.existsSync(outputPath)) {
					// Resize the image using sharp
					sharp(originalPath)
						.resize({ width: width })
						.toFile(outputPath, (err, info) => {
							if (err) {
								console.error(
									`Error resizing image: ${err.message}`
								);
							} else {
								console.log(`Resized and saved: ${outputPath}`);
							}
						});
				} else {
					console.log(`Skipped (already resized): ${outputPath}`);
				}
			});

			// Copy the original image to the resized folder
			const originalOutputPath = path.join(outputFolder, filename);
			if (!fs.existsSync(originalOutputPath)) {
				fs.copyFileSync(originalPath, originalOutputPath);
				console.log(`Copied original image: ${originalOutputPath}`);
			} else {
				console.log(
					`Skipped (original image already exists): ${originalOutputPath}`
				);
			}
		}
	});
});
