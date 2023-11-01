import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import styled from 'styled-components';
import { ConfirmButton, TopNavigation } from 'components';
import { FeedbackApi } from 'api';

const Opinion = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');

  const handleNavigate = async () => {
    try {
      await FeedbackApi.postFeedback(value);
      navigate(utils.URL.RESULT.OPINION);
    } catch (error) {
      console.error('피드백 전송 에러:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <S.Wrap>
      <TopNavigation />
      <S.TitleFrame>
        <S.MainTitle>로귄이에게 하고 싶은 말이 있나요 ?</S.MainTitle>
        <S.SubTitle>
          주신 의견은 한글자도 빼놓지 않고 꼼꼼히 읽어볼게요!
        </S.SubTitle>
      </S.TitleFrame>
      <S.InputBox
        placeholder="내용을 입력해주세요"
        value={value}
        onChange={handleChange}
      ></S.InputBox>
      <S.BottomFrame>
        <ConfirmButton onClick={handleNavigate} text="전송하기" />
      </S.BottomFrame>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,
  TitleFrame: styled.div`
    margin-top: 30px;
    text-align: center;
  `,
  MainTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.display1};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.display1};
  `,
  SubTitle: styled.div`
    margin-top: 10px;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
  `,

  BottomFrame: styled.div`
    margin: auto 0 35px 0;
    width: 100%;
  `,

  InputBox: styled.textarea`
    margin-top: 20px;
    width: 90%;
    padding: 20px 20px 50px;
    border: none;
    border-radius: 4px;
    resize: none;
    background-color: ${({ theme }) => theme.color.gray4};
    font-family: ${({ theme }) => theme.font.family.body2};
    &:focus {
      outline: none;
    }
  `,
};
export default Opinion;
