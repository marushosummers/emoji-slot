import { createCanvas } from "canvas";
import { fillTextWithTwemoji } from "node-canvas-with-twemoji";

export default async (
	request,
	response
) => {
	const buf = await createOGP();

	response.writeHead(200, {
		"Content-Type": "image/png",
		"Content-Length": buf.length,
	});
	response.end(buf, "binary");
};

const createOGP = async () => {
	const W = 1200;
	const H = 630;

	const canvas = createCanvas(W, H);
	const ctx = canvas.getContext("2d");

  // backgroud color
  ctx.fillStyle = "#F7F7F7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

	// The size of the emoji
	ctx.font = "120px serif";
  ctx.fillStyle = "#000000";

	// use positioning
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	// draw the emoji
	await fillTextWithTwemoji(
		ctx,
		"🎰",
		(canvas.width / 6) * 2,
		canvas.height / 2
	);
	await fillTextWithTwemoji(
		ctx,
		"🎰",
		(canvas.width / 6) * 3,
		canvas.height / 2
	);
	await fillTextWithTwemoji(
		ctx,
		"🎰",
		(canvas.width / 6) * 4,
		canvas.height / 2
	);

	return canvas.toBuffer();
};
