import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, info: string | number) => void;
  title: string;
  nowInfo: number;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  title,
  isOpen,
  onClose,
  onSave,
  nowInfo,
}) => {
  const [newInfo, setNewInfo] = useState<number>(nowInfo);

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewInfo(Number(e.target.value) ? Number(e.target.value) : 0);
  };

  const handleInfoUpdate = () => {
    onSave(title, newInfo);
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={onClose}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>{title} 수정</h2>
            <input
              type="text"
              placeholder={`${title} 정보를 입력해주세요`}
              value={newInfo}
              onChange={handleInfoChange}
            />
            <button onClick={handleInfoUpdate}>수정하기</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.color.white};
  padding: 30px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  justify-content: center;
  gap: 10px;

  & input {
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.color.main};
    width: 100%;
    height: 30px;
    margin-top: 14px;
    font-size: ${({ theme }) => theme.font.size.focus3};
    font-family: ${({ theme }) => theme.font.family.focus3};
    line-height: ${({ theme }) => theme.font.lineheight.focus3};
    background-color: transparent;
    color: ${({ theme }) => theme.color.dark};

    &:focus {
      outline: none;
      border-radius: 0px;
      border-bottom: 1px solid ${({ theme }) => theme.color.main};
    }
  }

  & button {
    width: 80%;
    height: fit-content;
    margin-top: 20px;
    font-size: ${({ theme }) => theme.font.size.focus3};
    font-family: ${({ theme }) => theme.font.family.focus3};
    line-height: ${({ theme }) => theme.font.lineheight.focus3};
    padding: 12px;
    background-color: ${({ theme }) => theme.color.main};
    color: #fff;
    border-radius: 4px;
  }
`;

export default EditProfileModal;
