export const removeWordsAfterSlash = sentence => {
  const result = sentence.replace(/\/.*?,/, ',').split(', ');
  return result;
};

export const removeWordsAfterLastNumber = sentence => {
  return sentence.replace(/\D+$/g, '');
};
