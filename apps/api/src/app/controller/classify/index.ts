import "../../../env";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  maxRetries: 1,
  maxConcurrency: 1,
  temperature: 0,
  cache: true,
});

const prompt =
  PromptTemplate.fromTemplate(`From this text, and this list of concepts, generate an array of objects with "name" (the name of the concept), and "confidence" (a number between 0 and 100 that represents how much present and/or related is the concept on this text, 0 is absolutely not relevant for the text, and 100 is absolutely relevant for the text).
The confidence is given by the inherence or relationship of the concept in the text. Be careful with this, if you are not sure about your confidence, is better to put a minor score than a major score.
Put in the array ALL the concepts of the list, but you can't add concepts that are not in the list.

Example:
[{{"name": "love", "confidence": 90}}, {{"name": "hate", "confidence": 10}}]
  
Text to analyze concepts:
{text}

List of concepts:
{concepts}

Array response:`);

const chain = new LLMChain({
  llm: model,
  prompt: prompt,
  verbose: true,
});

export interface classifyOptions {
  text: string;
  tags: {
    name: string;
    description?: string;
  }[];
}

export async function classify({ tags, text }: classifyOptions) {
  const result = await chain.call({
    text: text,
    concepts: JSON.stringify(tags.map((tag) => ({ ...tag, confidence: null }))),
  });

  return JSON.parse(result.text as string);
}
