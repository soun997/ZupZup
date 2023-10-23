import styled from 'styled-components';
import AngleLeftSvg from 'assets/icons/angle-left.svg?react';

interface Props {
	title?: string | null;
	rightComponent?: React.ReactElement | null;
}

const TopNavigation = (props: Props) => {
	return (
		<S.Wrap>
			<S.LeftSection>
				<AngleLeftSvg />
			</S.LeftSection>
			{props.title && <S.MiddleSection>{props.title}</S.MiddleSection>}
			{props.rightComponent && (
				<S.RightSection>{props.rightComponent}</S.RightSection>
			)}
		</S.Wrap>
	);
};

const S = {
	Wrap: styled.div`
		width: 100%;
		display: flex;
		align-items: center;
		height: 44px;
		justify-content: space-between;
	`,

	LeftSection: styled.div`
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		flex-shrink: 0;
	`,
	MiddleSection: styled.div``,
	RightSection: styled.div``,
};

export default TopNavigation;
