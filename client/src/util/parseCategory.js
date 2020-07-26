function parseCategory(category) {
  let words = category.split("-");
  let word = "";
  if (words.length === 1) word = category;
  if (words.length === 2) word = words[0] + " and " + words[1];

  if (words.length > 2) {
    words.forEach((w, i) => {
      if (i < words.length - 2) word = word + w + ", ";
      else if (i === words.length - 2) word = word + w + " and ";
      else word = word + w;
    });
  }
  return word;
}

export default parseCategory;
