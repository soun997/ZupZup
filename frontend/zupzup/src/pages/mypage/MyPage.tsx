import MyPageNav from 'components/mypage/MyPageNav';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <S.Wrap>
      <MyPageNav coin={320} />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background: url('assets/images/mypage-wall.png');
  `,
};

export default MyPage;
