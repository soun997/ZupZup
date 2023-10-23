import Lottie from 'lottie-react';
import successLottie from 'assets/lottie/success-lottie.json';
import styled from 'styled-components';

const SuccessAnimation = () => {
	return (
		<LottieFrame>
			<Lottie
				className="lottie"
				loop={false}
				animationData={successLottie}
				height={200}
				width={200}
			/>
		</LottieFrame>
	);
};

const LottieFrame = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	.lottie {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70%;
		height: 70%;
	}
`;
export default SuccessAnimation;
