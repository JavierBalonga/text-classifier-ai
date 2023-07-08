export interface classifyOptions {
  text: string;
  tags: {
    name: string;
    description: string;
  }[];
}

export async function classify({ tags }: classifyOptions): Promise<string[]> {
  console.log("TODO: Implemnt classify algorithm");
  return tags.map((tag) => tag.name);
}
