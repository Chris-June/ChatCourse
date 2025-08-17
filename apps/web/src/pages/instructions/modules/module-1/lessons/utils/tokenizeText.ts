// Simplified tokenizer for demonstration
// Splits by word boundaries or grabs any non-whitespace character.
export const tokenizeText = (text: string): string[] => {
  return text.match(/\b\w+\b|\S/g) || [];
};
