import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import GoogleGenerativeAI

type Bindings = {
	GOOGLE_API_KEY: string; // Changed to GOOGLE_API_KEY
	AI: Ai;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	'*',
	cors({
		origin: '*', // Allow requests from your Next.js app
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'], //Add Content-Type to the allowed headers to fix CORS
		allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
);

app.post(`/chatToDocument`, async (c) => {
	// Initialize GoogleGenerativeAI client
	const genAI = new GoogleGenerativeAI(c.env.GOOGLE_API_KEY);
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Specify Gemini 1.5 Flash

	const { documentData, question } = await c.req.json();

	// Prepare messages in Gemini format
	const messages = [
		{
			role: 'user', // System instructions go in the first user message
			parts: [
				{
					text:
						`You are an assistant helping the user to chat to a document. ` +
						`I am providing a JSON file of the markdown for the document. ` +
						`Using this, answer the users question in the clearest way possible. ` +
						`The document is about:\n\n` +
						documentData,
				},
			],
		},
		{
			role: 'user',
			parts: [{ text: `My Question is: ` + question }],
		},
	];

	try {
		const result = await model.generateContent({
			contents: messages,
			generationConfig: {
				temperature: 0.5,
			},
		});

		const response = result.response.text(); // Get the generated text

		return c.json({ message: response });
	} catch (error) {
		console.error('Error generating content with Gemini:', error);
		return c.json({ error: 'Failed to generate response from Gemini API' }, 500);
	}
});

app.post('/translateDocument', async (c) => {
	const { documentData, targetLang } = await c.req.json();

	// Generate a summary of the document
	const summaryResponse = await c.env.AI.run('@cf/facebook/bart-large-cnn', {
		input_text: documentData,
		max_length: 1000,
	});
	// translate the summary into another language
	const response = await c.env.AI.run('@cf/meta/m2m100-1.2b', {
		text: summaryResponse.summary,
		source_lang: 'english',
		target_lang: targetLang,
	});

	return new Response(JSON.stringify(response));
});

export default app;
