import { useState } from "react";

interface Values {
  text: string;
  tags: { name: string; description: string }[];
}

export default function App() {
  const [values, setValues] = useState<Values>({
    text: "",
    tags: [],
  });

  const handleAddTag = () => {
    setValues({
      ...values,
      tags: [
        ...values.tags,
        {
          name: "",
          description: "",
        },
      ],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues({
      ...values,
      text: e.target.value,
    });
  };

  const handleTagNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newName = e.target.value;
    setValues((prev) => {
      const newTags = [...prev.tags];
      const newTag = { ...newTags[index], name: newName };
      newTags[index] = newTag;
      return {
        ...prev,
        tags: newTags,
      };
    });
  };

  const handleTagDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newDescription = e.target.value;
    setValues((prev) => {
      const newTags = [...prev.tags];
      const newTag = { ...newTags[index], description: newDescription };
      newTags[index] = newTag;
      return {
        ...prev,
        tags: newTags,
      };
    });
  };

  return (
    <form
      className="w-full max-w-[500px] min-h-[200px] bg-slate-300 text-slate-700 rounded-lg p-8 flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <label htmlFor="text">Text</label>
      <textarea id="text" value={values.text} onChange={handleTextChange} />
      {values.tags.map((tag, index) => (
        <fieldset key={index} className="flex flex-col gap-2">
          <legend>Tag {index + 1}</legend>
          <label htmlFor={`tag-name-${index}`}>Name</label>
          <input
            id={`tag-name-${index}`}
            type="text"
            value={tag.name}
            onChange={(e) => handleTagNameChange(e, index)}
          />
          <label htmlFor={`tag-description-${index}`}>Description</label>
          <input
            id={`tag-description-${index}`}
            type="text"
            value={tag.description}
            onChange={(e) => handleTagDescriptionChange(e, index)}
          />
        </fieldset>
      ))}
      <button onClick={handleAddTag}>+</button>
    </form>
  );
}
