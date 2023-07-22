export interface Tag {
  id: number;
  name: string;
  description: string;
}

export interface ClassifiedTextResult {
  id: number;
  text: string;
  tags: {
    name: string;
    confidence: number;
  }[];
}
