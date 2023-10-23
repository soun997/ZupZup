import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavigation from 'components/common/TopNavigation';
import RegistInfoInput from 'components/login/RegistInfoInput';
import RegistInfoTitle from 'components/login/RegistInfoTitle';
import RegistInfoFrame from 'components/login/RegistInfoFrame';

const RegistInfo = () => {
	const { state } = useLocation();
	useEffect(() => {
		console.log(state);
	}, []);

	const navigate = useNavigate();
	const inputRefForBirthYear = useRef<HTMLInputElement | null>(null);
	const inputRefForGender = useRef<HTMLInputElement | null>(null);
	const [isNextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);

	const inputCheck = (
		birthYearInput: string | undefined,
		genderInput: string | undefined,
	) => {
		if (
			birthYearInput &&
			Number(birthYearInput) > 1900 &&
			Number(birthYearInput) < 2024
		) {
			if (genderInput) {
				return true;
			}
		}
		return false;
	};

	const handleInputChange = () => {
		const birthYearInput = inputRefForBirthYear.current?.value;
		const genderInput = inputRefForGender.current?.value;
		setNextButtonDisabled(!inputCheck(birthYearInput, genderInput));
	};

	const handleNextPage = () => {
		if (
			inputCheck(
				inputRefForBirthYear.current?.value,
				inputRefForGender.current?.value,
			)
		) {
			navigate('/');
		}
	};
	return (
		<RegistInfoFrame.Wrap>
			<TopNavigation />
			<RegistInfoTitle
				mainTitle={'나이와 성별을 입력해주세요'}
				subTitle={'칼로리 계산에 사용됩니다'}
			/>
			<RegistInfoFrame.InputSection>
				<RegistInfoInput
					holderText="예) 1990"
					inputRef={inputRefForBirthYear}
					onChange={handleInputChange}
					title="출생 연도"
				/>
				<RegistInfoInput
					holderText="예) 70"
					inputRef={inputRefForGender}
					onChange={handleInputChange}
					title="성별"
				/>
			</RegistInfoFrame.InputSection>
			<RegistInfoFrame.NextButton
				disabled={isNextButtonDisabled}
				onClick={handleNextPage}
			>
				가입 완료하기
			</RegistInfoFrame.NextButton>
		</RegistInfoFrame.Wrap>
	);
};

export default RegistInfo;
