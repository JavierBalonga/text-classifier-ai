import "../../../env";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  maxRetries: 1,
  temperature: 0,
});

const prompt = PromptTemplate.fromTemplate(
  `From this **list of concepts**, and this **text**, estimate which **concepts** appear in it and with what **confidence** you would say that they appear.
And **confidence** is a number that goes from 0 to 100.
DO NOT ADD **concepts** THAT ARE NOT ON THE **list of concepts**.

List of concepts:
{concepts}

Text: {text}

Example: 'Assigned concepts:[{{"name": "dog", "confidence": 90}}, {{"name": "cat", "confidence": 20}}]'

Assigned concepts:`
);

const chain = new LLMChain({
  llm: model,
  prompt: prompt,
});

interface AssignedTag {
  name: string;
  confidence: number;
}

export interface classifyOptions {
  text: string;
  tags: {
    name: string;
    description?: string;
  }[];
}

export async function classify({
  tags,
  text,
}: classifyOptions): Promise<AssignedTag[]> {
  const result = await chain.call({
    concepts: tags
      .map(
        (tag) => `- ${tag.name}: ${tag.description || "[EMPTY DESCRIPTION]"}`
      )
      .join("\n"),
    text: text,
  });

  const assignedtags = JSON.parse(result.text as string) as AssignedTag[];

  const wrongTags: AssignedTag[] = [];
  const correctTags: AssignedTag[] = [];

  assignedtags.forEach((tag) => {
    if (tags.some((t) => t.name === tag.name)) {
      correctTags.push(tag);
    } else {
      wrongTags.push(tag);
    }
  });

  console.log("wrongTags", wrongTags);

  return correctTags;
}
