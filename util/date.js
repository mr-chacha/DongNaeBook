// 사용법
// 쓰려고 하는 컴포넌트에서 now를 임포트해주시고, 사용하실 때는 now() 하시면 됩니다.

import dayjs from 'dayjs';

const DATE_FORMAT = 'YY.MM.DD';

export const now = () => {
  const now = dayjs();
  return now.format(DATE_FORMAT);
};
