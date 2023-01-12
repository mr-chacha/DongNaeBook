// 공백 제거
export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, '');
};
