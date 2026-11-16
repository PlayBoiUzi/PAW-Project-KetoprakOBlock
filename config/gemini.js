require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;

module.exports = {
  ai: apiKey ? new GoogleGenAI({ apiKey }) : null,
  model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
};