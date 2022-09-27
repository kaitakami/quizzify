export const getQuestionsAPI = async (id) => {
  const url = `https://opentdb.com/api.php?amount=5&category=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const { results } = data;
  return results;
};
