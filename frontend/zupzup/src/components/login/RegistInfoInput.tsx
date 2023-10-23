import styled from 'styled-components';
import { ChangeEvent, RefObject } from 'react';

interface RegistInfoInputProps {
	title: string;
	holderText: string;
	inputRef: RefObject<HTMLInputElement>;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RegistInfoInput = ({
	title,
	holderText,
	inputRef,
	onChange,
}: RegistInfoInputProps) => {
	return (
		<S.InputBox>
			<S.Title>{title}</S.Title>
			<Input placeholder={holderText} ref={inputRef} onChange={onChange} />
		</S.InputBox>
	);
};

const S = {
	InputBox: styled.div`
		width: 100%;
		padding: 0 18px 30px;
	`,
	Title: styled.div`
		font-weight: ${({ theme }) => theme.font.weight.body2};
		font-size: ${({ theme }) => theme.font.size.body2};
		font-family: ${({ theme }) => theme.font.family.focus2};
		margin-bottom: 12px;
	`,
};

const Input = styled.input`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 56px;
	padding: 12px 16px;
	align-items: center;
	gap: 4px;
	align-self: stretch;
	border: none;
	background-color: ${({ theme }) => theme.color.background};

	&::placeholder {
		font-size: 14px;
		font-weight: 500;
		line-height: 130%;
		letter-spacing: -0.014px;
		color: ${({ theme }) => theme.color.gray3};
	}
	&:focus {
		outline: none;
		border-bottom: 1px solid ${({ theme }) => theme.color.main};
	}
`;

export default RegistInfoInput;
