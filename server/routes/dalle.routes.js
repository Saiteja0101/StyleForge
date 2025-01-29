import express from 'express';
import * as dotenv from 'dotenv';
import Configuration from 'openai';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: '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',
});

const openai = new OpenAI(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response =async (params) => {
      await OpenAI.CreateImage({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      });
    } 

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;