import { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import DetailContent from '../components/Detail/DetailContent';
import Review from '../components/Review/Review';

// params 찍어보기 비교하기
// 최종적인 것 이전 단도 log 찍어보기
// params 찍어보기 비교하기
// 최종적인 것 이전 단도 log 찍어보기
export default function Detail({
  navigation: { navigate },
  route: {
    params: { bookId },
  },
}) {
  // 신간도서 state
  const [recentBooks, setRecentBooks] = useState([]);

  //베스트셀러 state
  const [bestSeller, setBestSeller] = useState([]);

  // 로딩 state
  // const [isLoading, setIsLoading] = useState(true);
  // 신간도서 request url
  const BASE_URL = 'http://book.interpark.com/api/newBook.api';
  //  베스트 셀러 url
  const BEST_BASE_URL = 'https://book.interpark.com/api';

  // console.log('bookId', bookId);

  // api key
  const API_KEY = 'CAD800FCCF43A0A4B5BAD86C45EFCBC99D6140870C5C960566AE4D254543570F';
  //신간도서 api 가져오기
  const getApiRecentBooks = async () => {
    const { item } = await fetch(`${BASE_URL}?key=${API_KEY}&categoryId=100&output=json`).then(
      (res) => res.json()
    );
    setRecentBooks(item);
    // setIsLoading(false);
  };

  //best seller API 가져오는 함수
  const getBestSeller = async () => {
    const { item } = await fetch(
      `${BEST_BASE_URL}/bestSeller.api?key=${API_KEY}&categoryId=100&output=json`
    ).then((res) => res.json());
    setBestSeller(item);
    // setIsLoading(false);
  };

  useEffect(() => {
    getApiRecentBooks();
    getBestSeller();
  }, []);

  // 로딩중 화면
  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }
  return (
    <ScrollView>
      {/* 상세페이지 설명 */}
      {recentBooks
        .filter((i) => i.itemId == bookId)
        .map((book) => {
          return (
            <DetailContent
              key={book.itemId}
              book={book}
            />
          );
        })}
      {bestSeller
        .filter((i) => i.itemId == bookId)
        .map((book) => {
          return (
            <DetailContent
              key={book.itemId}
              book={book}
            />
          );
        })}

      {/* 별점 및 리뷰 */}
      <Review />
    </ScrollView>
  );
}
