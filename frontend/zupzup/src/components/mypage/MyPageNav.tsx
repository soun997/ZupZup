import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import * as utils from 'utils';

import CoinSvg from 'assets/icons/coin.svg?react';
import ShopSvg from 'assets/icons/shop.svg?react';
import SettingSvg from 'assets/icons/setting.svg?react';
import MoreInfoSvg from 'assets/icons/question.svg?react';

interface Props {
  coin: number;
}

const MyPageNav = ({ coin }: Props) => {
  const navigate = useNavigate();
  return (
    <S.Wrap>
      <S.LeftSection>
        <CoinSvg />
        <span>{coin}</span>
      </S.LeftSection>
      <S.RightSection>
        <MoreInfoSvg onClick={() => navigate(utils.URL.ONBORDING.CHARACTER)} />
        <ShopSvg onClick={() => navigate(utils.URL.MYPAGE.SHOP)} />
        <SettingSvg onClick={() => navigate(utils.URL.SETTING.HOME)} />
      </S.RightSection>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    justify-content: space-between;
    overflow: hidden;

    & svg g g path,
    svg g path {
      stroke: white;
    }
  `,

  LeftSection: styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    span {
      color: ${({ theme }) => theme.color.white};
      font-weight: ${({ theme }) => theme.font.weight.body2};
      font-size: ${({ theme }) => theme.font.size.body2};
      font-family: ${({ theme }) => theme.font.family.focus2};
      margin-top: 2px;
    }
  `,

  RightSection: styled.div`
    cursor: pointer;
    display: flex;
    gap: 10px;

    & svg {
      width: 22px;
      height: 22px;
    }
  `,
};

export default MyPageNav;
