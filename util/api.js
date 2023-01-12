// 신간도서 request url
const BASE_URL = "http://book.interpark.com/api/newBook.api";
// 베스트 request url
const BEST_BASE_URL = "https://book.interpark.com/api";
// api key
const API_KEY =
  "CAD800FCCF43A0A4B5BAD86C45EFCBC99D6140870C5C960566AE4D254543570F";

//신간도서 api 가져오기
export const getApiRecentBooks = () =>
  fetch(`${BASE_URL}?key=${API_KEY}&categoryId=100&output=json`).then((res) =>
    res.json()
  );

//API 가져오는 함수
export const getBestSeller = () =>
  fetch(
    `${BEST_BASE_URL}/bestSeller.api?key=${API_KEY}&categoryId=100&output=json`
  ).then((res) => res.json());
