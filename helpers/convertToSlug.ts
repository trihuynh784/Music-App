import unidecode from "unidecode";

export const convertToSlug = (text: string): string => {
  const formated = unidecode(text).replace(/\s+/g, "-");
  return formated;
}