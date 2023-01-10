import styled from '@emotion/native';
import { Rating } from 'react-native-ratings';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../util/Dimension';

export default function Review() {
  const [isModify, setIsModify] = useState(false);
  const handleModalOpen = () => {
    setIsModify(true);
  };
  const handleModalClose = () => {
    setIsModify(false);
  };
  return (
    <Reviewcontainner>
      <ReviewInputBox>
        <ReviewTitleRateBox>
          <ReviewTitle>책 리뷰</ReviewTitle>
          <Rating
            startingValue={0}
            ratingCount={5}
            imageSize={18}
            type='custom'
            ratingBackgroundColor='#d6d5d2'
            jumpValue={0.5}
            fractions={1}
            tintColor='#F2F2F2'
          />
        </ReviewTitleRateBox>
        <ReviewTextInput
          maxLength={100}
          multiline={true}
          placeholder='의견 남기기'
          scrollEnabled={false}
          onSubmitEditing={() => console.log('등록완료')}
        />
        <ReviewSubmitBtn>
          <SubmitText>등록하기</SubmitText>
        </ReviewSubmitBtn>
      </ReviewInputBox>

      <ComnnetContainner>
        <CommentBox>
          <ProfileImgBox>
            <ProfileImg
              source={{
                uri: 'https://img.extmovie.com/files/attach/images/135/286/386/076/02197f8e7c1fe5257dd98ecf223475e6.jpg',
              }}
            />
          </ProfileImgBox>
          <Commentbody>
            <Rate>⭐️⭐️⭐️⭐️</Rate>
            <InfoBox>
              <UserName>닉네임</UserName>
              <Seperator>|</Seperator>
              <CreatedDate>22.01.06</CreatedDate>
            </InfoBox>
            <Desc>
              오늘도 내일도 모레도 오늘도 내일 모레도 오늘도 내일도 모레도 오늘도 내일도 모레도 오늘
              내일도 모래반지빵야 내일도 빵야 아냐
            </Desc>
          </Commentbody>
          <IconBox onPress={handleModalOpen}>
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color='black'
            />
          </IconBox>
        </CommentBox>
        <CommentBox>
          <ProfileImgBox>
            <ProfileImg
              source={{
                uri: 'https://img.extmovie.com/files/attach/images/135/286/386/076/02197f8e7c1fe5257dd98ecf223475e6.jpg',
              }}
            />
          </ProfileImgBox>
          <Commentbody>
            <Rate>⭐️⭐️⭐️⭐️</Rate>
            <InfoBox>
              <UserName>닉네임</UserName>
              <Seperator>|</Seperator>
              <CreatedDate>22.01.06</CreatedDate>
            </InfoBox>
            <Desc>
              오늘도 내일도 모레도 오늘도 내일 모레도 오늘도 내일도 모레도 오늘도 내일도 모레도 오늘
              내일도 모래반지빵야 내일도 빵야 아냐
            </Desc>
          </Commentbody>
          <IconBox onPress={handleModalOpen}>
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color='black'
            />
          </IconBox>
        </CommentBox>
      </ComnnetContainner>

      <ModifyModal
        visible={isModify}
        transparent
        animationType='slide'>
        <FakeView></FakeView>
        <ModifyBox>
          <MenuBox>
            <MenuWrapper>
              <RewriteMenu>
                <AntDesign
                  name='edit'
                  size={24}
                  color='black'
                />
                <MenuName>수정하기</MenuName>
              </RewriteMenu>
              <DeleteMenu>
                <AntDesign
                  name='delete'
                  size={24}
                  color='black'
                />
                <MenuName>삭제하기</MenuName>
              </DeleteMenu>
            </MenuWrapper>

            <CloseBox onPress={handleModalClose}>
              <AntDesign
                name='close'
                size={24}
                color='black'
              />
            </CloseBox>
          </MenuBox>
        </ModifyBox>
      </ModifyModal>
    </Reviewcontainner>
  );
}

//
const FakeView = styled.View`
  flex-direction: column-reverse;
  flex: 0.88;
`;
const ModifyBox = styled.View`
  flex-direction: column-reverse;
  flex: 0.12;
`;

const MenuBox = styled.View`
  flex: 1;
  border-radius: 15px;
  background-color: #cdff40;
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
`;

const MenuWrapper = styled.View``;

const RewriteMenu = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 20px;
`;

const DeleteMenu = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 20px;
`;

const MenuName = styled.Text``;

//

const Reviewcontainner = styled.SafeAreaView`
  margin: 30px;
`;

const CloseBox = styled.TouchableOpacity`
  margin-top: 20px;
`;

// 별점 및 리뷰 관련
const ReviewInputBox = styled.View``;
const ReviewTitleRateBox = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

const ReviewTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-right: 10px;
`;

const ReviewTextInput = styled.TextInput`
  background-color: white;
  border-radius: 10px;
  height: ${SCREEN_HEIGHT / 9 + 'px'};
  font-size: 15px;
  padding: 10px;
`;

const ReviewSubmitBtn = styled.TouchableOpacity``;

const SubmitText = styled.Text`
  align-self: flex-end;
  padding: 10px;
`;

// 댓글 관련

const ComnnetContainner = styled.ScrollView`
  border-radius: 10px;
  margin-top: 30px;
`;

const CommentBox = styled.View`
  height: ${SCREEN_HEIGHT / 6 + 'px'};
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
`;

const ProfileImgBox = styled.View`
  margin-right: 10px;
`;

const ProfileImg = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 50px; // border-radius % + display : block은 안드로이드에서 안먹힘!!!!!
`;

const Commentbody = styled.View``;

const Rate = styled.Text`
  margin-bottom: 8px;
`;

const InfoBox = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const UserName = styled.Text`
  margin-right: 10px;
  color: grey;
`;

const Seperator = styled.Text`
  margin-right: 10px;
  color: grey;
`;

const CreatedDate = styled.Text`
  color: grey;
`;

const Desc = styled.Text`
  width: ${SCREEN_WIDTH / 1.5 + 'px'};
`;

const IconBox = styled.TouchableOpacity``;

const ModifyModal = styled.Modal``;
