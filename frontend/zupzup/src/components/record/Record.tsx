import styled from "styled-components";

import { RecordBox } from "components";

const Record = () => {
  return (
    <S.Wrap>
      <RecordBox />
      <RecordBox />
      <RecordBox />
      <RecordBox />
      <RecordBox />
      <RecordBox />
      <RecordBox />
      <RecordBox />
    </S.Wrap>
  );
};

export default Record;

const S = {
  Wrap: styled.div`
    width: 100%;
    height: calc(100vh - 280px);
    max-height: calc(100vh - 280px);
    background-color: ${({ theme }) => theme.color.background};
    padding: 20px 15px;

    overflow-y: auto;

    &::-webkit-scrollbar {
      height: 0px;
      width: 0px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.color.main};
      border-radius: 45px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.color.main};
    }
  `,
};
