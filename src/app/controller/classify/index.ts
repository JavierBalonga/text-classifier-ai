export interface classifyOptions {
  text: string;
  tags: {
    name: string;
    description: string;
  }[];
}

export async function classify({ tags }: classifyOptions): Promise<string[]> {
  console.log("TODO: Se hace Magia!");
  return tags.map((tag) => tag.name);
}
