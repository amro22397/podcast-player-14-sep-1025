import { v } from "convex/values";
import { action } from "./_generated/server";

import OpenAI from 'openai'
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const generateAudioAction = action({
    args: { input: v.string(), voice: v.string() },
  handler: async (_, { voice, input}) => {
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice : voice as SpeechCreateParams['voice'],
        input,
      });
      const buffer = await mp3.arrayBuffer();

      return buffer;
  },
});

export const generateThumbnailAction = action({
  handler: async (_, { prompt }) => {
    const response = await openai.images.generate({
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    })

    const url = response.data[0].url;

    if (!url) {
      throw new Error('Error generating thumbnail');
    }

    const imageResponse = await fetch(url);
    const buffer = await imageResponse.arrayBuffer();
  }
})