import styled from 'styled-components';

const RegistInfo = () => {
	return <S.Wrap>RegistInfo</S.Wrap>;
};

const S = {
	Wrap: styled.div`
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		background-color: ${({ theme }) => theme.color.background};
	`,
};

export default RegistInfo;
