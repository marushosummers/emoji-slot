import { createCanvas } from "canvas";
import { fillTextWithTwemoji } from "node-canvas-with-twemoji";

export default async (request, response) => {
	try{
		const parameters = getPrameters(request.query);
		const buf = await createOGP(parameters);
		response.writeHead(200, {
			"Content-Type": "image/png",
			"Content-Length": buf.length,
		});
		response.end(buf, "binary");
	} catch(e) {
		response.writeHead(500, {
			"Content-Type": "text/html",
		});
		response.end("Internal Server Error");
	}
};

const getPrameters = (query) => {
	return {
		p1: query.p1 ?? "🎰",
		p2: query.p2 ?? "🎰",
		p3: query.p3 ?? "🎰",
	};
}

const createOGP = async (parameters) => {
	const W = 600;
	const H = 315;

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
		parameters.p1,
		(canvas.width / 4) * 1,
		(canvas.height / 4) * 3
	);
	await fillTextWithTwemoji(
		ctx,
		parameters.p3,
		(canvas.width / 4) * 2,
		(canvas.height / 4) * 3
	);
	await fillTextWithTwemoji(
		ctx,
		parameters.p2,
		(canvas.width / 4) * 3,
		(canvas.height / 4) * 3
	);

	return canvas.toBuffer();
};
