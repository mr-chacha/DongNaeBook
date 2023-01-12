import styled from '@emotion/native';
import { Rating } from 'react-native-ratings';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../util/Dimension';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { uuidv4 } from '@firebase/util';
import { now } from '../../util/date';
import { useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { Alert, useColorScheme, View } from 'react-native';
import Switch from 'expo-dark-mode-switch';
import React from 'react';
export default function Review({ bookId, bookTitle, bookImage }) {
  const currentUser = getAuth().currentUser;

  const [isModify, setIsModify] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [isDeleteToast, setIsDeleteToast] = useState(false);
  const [isEditToast, setIsEditToast] = useState(false);

  const [ratings, setRatings] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [nickName, setNickName] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [reviewId, setReviewId] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  // 리뷰 수정 스테이트
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const [editRatings, setEditRatings] = useState(0);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    if (!currentUser) return;
    getUserInfo();
  }, [currentUser]);

  // 파이어베이스에서 댓글 불러오기
  // bookId === bookId 만족하는 것들만 가져와라
  useEffect(() => {
    const q = query(collection(db, 'reviews'), where('bookId', '==', bookId), orderBy('createdDate', 'desc'));

    onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map((doc) => {
        const review = {
          id: doc.id,
          ...doc.data(),
        };
        return review;
      });
      setReviewList(reviews);
    });
  }, []);

  const getUserInfo = async () => {
    const q = await query(collection(db, 'users'), where('uid', '==', currentUser.uid));
    getDocs(q).then((querySnapshot) => {
      const user = [];
      querySnapshot.forEach((doc) => {
        user.push({ nickName: doc.data().nickName });
      });
      setNickName(user[0].nickName);
    });
  };

  // 수정 / 삭제 모달 오픈 함수
  const handleModalOpen = () => {
    setIsModify(true);
  };
  const handleModalClose = () => {
    setIsModify(false);
  };

  // 수정 에디터 모달 닫기 함수
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  // 수정 별점 핸들링 함수
  const handleEditRatings = (rating) => {
    setEditRatings(rating);
  };

  // 수정 코멘트 핸들링 함수
  const handleEditedComment = (editedcomment) => {
    setEditedComment(editedcomment);
  };

  //별점 핸들링 함수
  const handleRatings = (rating) => {
    setRatings(rating);
  };

  // 코멘트 핸들링 함수
  const handleNewComment = (comment) => {
    setNewComment(comment);
  };

  // 신규 코멘트 등록 함수
  const addReview = async () => {
    // 유효성 검사
    if (!ratings && !newComment) {
      setIsValid(true);
      setTimeout(() => {
        setIsValid(false);
      }, 2000);
      // 이게 어떻게 조건을 판단하는 거지...?
    } else if (!ratings && newComment) {
      setIsRated(true);
      setTimeout(() => {
        setIsRated(false);
      }, 2000);
    } else if (ratings && !newComment) {
      setIsCommented(true);
      setTimeout(() => {
        setIsCommented(false);
      }, 2000);
    } else {
      await addDoc(collection(db, 'reviews'), {
        comment: newComment,
        rating: ratings,
        commentId: uuidv4(),
        createdDate: now(),
        creatorId: currentUser.uid,
        profileImage: currentUser.photoURL,
        nickName: nickName,
        bookId: bookId,
        bookTitle: bookTitle,
        bookImage: bookImage,
        isEdit: false,
      });
      // 등록 시 별점은 어떻게 초기화시키지? (Rating 컴포넌트만 리렌더링 해줘야 하나?)
      setRatings(0);
      setNewComment('');
      setIsToastOpen(true);
      setTimeout(() => {
        setIsToastOpen(false);
      }, 2000);
    }
  };

  // 코멘트 삭제 함수
  // 이걸 적은 사람만 삭제할 수 있어야 함
  const deleteReview = (reviewId) => {
    Alert.alert('리뷰를 삭제합니다', '정말 삭제하시겠어요?', [
      {
        text: '아니요',
      },
      {
        text: '삭제',
        onPress: async () => {
          await deleteDoc(doc(db, 'reviews', reviewId));
          console.log('id', reviewId);
          setIsDeleteToast(true);
          setTimeout(() => {
            setIsDeleteToast(false);
          }, 2000);
        },
      },
    ]);
  };

  // 코멘트 수정 함수
  // 수정 모달을 하나 만들고
  // 거기에 기존값들은 전달해준 다음
  // 수정할 수 있도록 해줘야겠다.
  const setEdit = async (reviewId) => {
    const target = reviewList.findIndex((review) => review.id === reviewId);
    await updateDoc(doc(db, 'reviews', reviewId), {
      isEdit: !reviewList[target].isEdit,
    });
  };

  const editReview = async (reviewId) => {
    await updateDoc(doc(db, 'reviews', reviewId), {
      rating: editRatings,
      comment: editedComment,
      isEdit: false,
    });
    setEditedComment('');
    setIsEditToast(true);
    setTimeout(() => {
      setIsEditToast(false);
    }, 2000);
  };
  const isDark = useColorScheme() === 'dark';

  return (
    <Reviewcontainner>
      {!currentUser ? (
        <></>
      ) : (
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
              tintColor={isDark === false ? '#f3f3f3' : 'black'}
              onFinishRating={handleRatings}
            />
          </ReviewTitleRateBox>
          <ReviewTextInput maxLength={100} multiline={true} placeholder='100자 이내로 코멘트를 남겨주세요' scrollEnabled={false} value={newComment} onChangeText={handleNewComment} />
          <ReviewSubmitBtn onPress={addReview}>
            <SubmitText>등록하기</SubmitText>
          </ReviewSubmitBtn>
        </ReviewInputBox>
      )}

      <ComnnetContainner>
        {reviewList.map((review) => (
          <CommentBox key={review.commentId}>
            <ProfileImgBox>
              <ProfileImg
                source={{
                  uri: 'https://img.extmovie.com/files/attach/images/135/286/386/076/02197f8e7c1fe5257dd98ecf223475e6.jpg',
                }}
              />
            </ProfileImgBox>
            <Commentbody>
              <Rate>⭐️ {review.rating}</Rate>
              <InfoBox>
                <UserName>{review.nickName}</UserName>
                <Seperator>|</Seperator>
                <CreatedDate>{review.createdDate}</CreatedDate>
              </InfoBox>
              <Desc>{review.comment}</Desc>
            </Commentbody>
            <IconBox
              disabled={currentUser?.uid !== review.creatorId}
              onPress={() => {
                handleModalOpen();
                setReviewId(review.id);
                //
                setReviewRating(review.rating);
                setReviewComment(review.comment);
              }}
            >
              <MaterialCommunityIcons name='dots-vertical' size={24} color='black' />
            </IconBox>
          </CommentBox>
        ))}
      </ComnnetContainner>

      <ModifyModal visible={isModify} transparent animationType='slide'>
        <FakeView></FakeView>
        <ModifyBox>
          <MenuBox>
            <MenuWrapper>
              <RewriteMenu
                onPress={() => {
                  setIsModify(false);
                  setEditModalOpen(true);
                  setEdit(reviewId);
                }}
              >
                <AntDesign name='edit' size={24} color='black' />
                <MenuName>수정하기</MenuName>
              </RewriteMenu>
              <DeleteMenu
                onPress={() => {
                  deleteReview(reviewId);
                  setIsModify(false);
                }}
              >
                <AntDesign name='delete' size={24} color='black' />
                <MenuName>삭제하기</MenuName>
              </DeleteMenu>
            </MenuWrapper>

            <CloseBox onPress={handleModalClose}>
              <AntDesign name='close' size={24} color='black' />
            </CloseBox>
          </MenuBox>
        </ModifyBox>
      </ModifyModal>

      <EditModal visible={editModalOpen} animationType='slide' transparent>
        <EditModalBackdrop>
          <EditModalView>
            <EditInputBox>
              <EditTitleRateBox>
                <Rating
                  startingValue={reviewRating}
                  ratingCount={5}
                  imageSize={18}
                  type='custom'
                  ratingBackgroundColor='#d6d5d2'
                  jumpValue={0.5}
                  fractions={1}
                  tintColor='#F2F2F2'
                  onFinishRating={handleEditRatings}
                />
              </EditTitleRateBox>
              <EditTextInput maxLength={100} multiline={true} scrollEnabled={false} placeholder={reviewComment} value={editedComment} onChangeText={handleEditedComment} />
              <EditSubmitBtn
                onPress={() => {
                  editReview(reviewId);
                  handleEditModalClose();
                }}
              >
                <EditSubmitText>수정하기</EditSubmitText>
              </EditSubmitBtn>
            </EditInputBox>
            <EditClose onPress={handleEditModalClose}>
              <AntDesign name='close' size={24} color='black' />
            </EditClose>
          </EditModalView>
        </EditModalBackdrop>
      </EditModal>

      <Toast backgroundColor='#21d210' opacity={1} position={0} visible={isToastOpen}>
        <ToastView>
          <ToastText>💌 리뷰가 등록됐어요 !</ToastText>
        </ToastView>
      </Toast>

      <Toast backgroundColor='#21d210' opacity={1} position={0} visible={isDeleteToast}>
        <ToastView>
          <DeleteToastText>🗑️ 삭제 완료</DeleteToastText>
        </ToastView>
      </Toast>

      <Toast backgroundColor='#21d210' opacity={1} position={0} visible={isEditToast}>
        <ToastView>
          <EditToastText>✍️ 수정 완료</EditToastText>
        </ToastView>
      </Toast>

      <Toast backgroundColor='#ffe600' opacity={1} position={0} visible={isValid}>
        <ToastView>
          <ToastText1>😅 리뷰를 작성하지 않았어요</ToastText1>
        </ToastView>
      </Toast>
      <Toast backgroundColor='#ff0400' opacity={1} position={0} visible={isRated} delay={3}>
        <ToastView>
          <ToastText2>😅 별점을 입력하지 않았어요</ToastText2>
        </ToastView>
      </Toast>
      <Toast backgroundColor='#ff0400' opacity={1} position={0} visible={isCommented}>
        <ToastView>
          <ToastText3>😅 코멘트를 입력하지 않았어요</ToastText3>
        </ToastView>
      </Toast>
    </Reviewcontainner>
  );
}

// 수정 모달
const EditModal = styled.Modal``;
const EditModalBackdrop = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;

const EditModalView = styled.View`
  padding: 20px;
  width: ${SCREEN_WIDTH};
  margin-top: ${SCREEN_HEIGHT / 3 + 'px'};
`;

const EditInputBox = styled.View``;
const EditTitleRateBox = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

const EditTextInput = styled.TextInput`
  background-color: white;
  border-radius: 10px;
  height: ${SCREEN_HEIGHT / 9 + 'px'};
  font-size: 15px;
  padding: 10px;
`;

const EditSubmitBtn = styled.TouchableOpacity``;

const EditSubmitText = styled.Text`
  align-self: flex-end;
  padding: 10px;
`;

const EditClose = styled.TouchableOpacity`
  align-items: flex-start;
`;

//
const ToastView = styled.View`
  width: ${SCREEN_WIDTH / 1.4 + 'px'};
  height: 30px;
  padding-top: 7px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const ToastText = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: 700;
`;

const DeleteToastText = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: 700;
`;

const EditToastText = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: 700;
`;

const ToastText1 = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: 700;
`;

const ToastText2 = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
`;

const ToastText3 = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
`;

// 수정 / 삭제 모달
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
  background-color: #2dff00;
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
  color: ${(props) => props.theme.text};
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
  color: ${(props) => props.theme.text};
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
