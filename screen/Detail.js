import { ScrollView, ActivityIndicator } from "react-native";
import DetailContent from "../components/Detail/DetailContent";
import Review from "../components/Review/Review";
import { useQuery } from "react-query";
import { getApiRecentBooks, getBestSeller } from "../util/api";
import styled from "@emotion/native";
// params 찍어보기 비교하기
// 최종적인 것 이전 단도 log 찍어보기
export default function Detail({
  navigation: { navigate },
  route: { params },
}) {
  // 신간도서
  const { data: recentBooks, isLoading: isLoadingRB } = useQuery(
    "RecentBooks",
    getApiRecentBooks
  );
  // 베스트셀러
  const { data: bestSeller, isLoading: isLoadingSD } = useQuery(
    "bestSeller",
    getBestSeller
  );

  return (
    <Safe>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 상세페이지 설명 */}
        {recentBooks?.item
          .filter((i) => i.itemId == params.params.bookId)
          .map((book) => {
            return <DetailContent key={book.itemId} book={book} />;
          })}
        {bestSeller?.item
          .filter((i) => i.itemId == params.params.bookId)
          .map((book) => {
            return <DetailContent key={book.itemId} book={book} />;
          })}

        {/* 별점 및 리뷰 */}
        <Review
          bookId={params.params.bookId}
          bookTitle={params.params.bookTitle}
          bookImage={params.params.bookImage}
        />
      </ScrollView>
    </Safe>
  );
}

const Safe = styled.SafeAreaView`
  background-color: ${(props) => props.theme.back};
  margin: auto;
  padding-top: 50px;
`;
