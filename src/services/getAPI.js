export const fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

export const fetchQuestionsAPI = async ({
  qtdeQuestions, token, id = '', difficulty = '', type = '',
}) => {
  try {
    let url = '';
    if (id.length > 0 || difficulty.length > 0 || type.length > 0) {
      url = `https://opentdb.com/api.php?amount=${qtdeQuestions}&token=${token}&category=${id}&difficulty=${difficulty}&type=${type}`;
    } else {
      url = `https://opentdb.com/api.php?amount=${qtdeQuestions}&token=${token}`;
    }
    console.log(url);
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategory = async () => {
  try {
    const url = 'https://opentdb.com/api_category.php';
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
