import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

import {
  TopNavigation,
  RegistInfoInput,
  RegistInfoTitle,
  RegistInfoFrame,
} from 'components';
import { RegistInfo } from 'types/ProfileInfo';
import {
  setAccessToken,
  setMemberName,
  setRefreshToken,
  useAppDispatch,
  useAppSelector,
} from 'hooks';
import { MemberApi } from 'api';

const RegistInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const memberId = useAppSelector(state => state.auth.memberId);
  const inputRefForHeight = useRef<HTMLInputElement>(null);
  const inputRefForWeight = useRef<HTMLInputElement>(null);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);

  const [heightValid, setHeightValid] = useState<boolean>(false);
  const [weightValid, setWeightValid] = useState<boolean>(false);

  const handlePassSubmit = async () => {
    try {
      const postData: RegistInfo = {
        height: null,
        weight: null,
        gender: null,
        birthYear: null,
        memberId: Number(memberId),
      };
      console.log(postData);
      const res = await MemberApi.registInfo(postData);
      const data = res.data.results;
      console.log('postData ', res);
      console.log(data);

      dispatch(setAccessToken(data.accessToken));
      dispatch(setRefreshToken(data.refreshToken));
      dispatch(setMemberName(data.memberName));
      navigate(utils.URL.RESULT.REGIST);
    } catch (error) {
      console.error('가입정보 전송 에러:', error);
    }
  };

  const inputCheck = (
    heightInput: string | undefined,
    weightInput: string | undefined,
  ) => {
    if (heightInput && Number(heightInput) > 100 && Number(heightInput) < 200) {
      if (
        weightInput &&
        Number(weightInput) > 10 &&
        Number(weightInput) < 200
      ) {
        return true;
      }
    }
    return false;
  };

  const handleInputChange = () => {
    const heightInput = inputRefForHeight.current?.value;
    const weightInput = inputRefForWeight.current?.value;

    if (heightInput && Number(heightInput) > 100 && Number(heightInput) < 200) {
      setHeightValid(true);
    } else {
      setHeightValid(false);
    }
    if (weightInput && Number(weightInput) > 10 && Number(weightInput) < 200) {
      setWeightValid(true);
    } else {
      setWeightValid(false);
    }
    setNextButtonDisabled(!inputCheck(heightInput, weightInput));
  };

  const handleNextPage = () => {
    if (
      inputCheck(
        inputRefForHeight.current?.value,
        inputRefForWeight.current?.value,
      )
    ) {
      navigate(utils.URL.LOGIN.REGIST_INFO.PROFILE, {
        state: {
          height: inputRefForHeight.current?.value,
          weight: inputRefForWeight.current?.value,
        },
      });
    }
  };
  return (
    <RegistInfoFrame.Wrap>
      <TopNavigation />
      <RegistInfoTitle
        mainTitle={'키와 몸무게를 입력해주세요'}
        subTitle={'칼로리 계산에 사용됩니다'}
      />
      <RegistInfoFrame.InputSection>
        <RegistInfoInput
          holderText="예) 170"
          inputRef={inputRefForHeight}
          onChange={handleInputChange}
          title="키 (cm)"
          validCheck={heightValid}
          errorMessage={'101 ~ 199cm 사이의 키를 입력해주세요'}
        />
        <RegistInfoInput
          holderText="예) 70"
          inputRef={inputRefForWeight}
          onChange={handleInputChange}
          title="몸무게 (kg)"
          validCheck={weightValid}
          errorMessage={'11 ~ 199kg 사이의 몸무게를 입력해주세요'}
        />
      </RegistInfoFrame.InputSection>
      <RegistInfoFrame.BottomSection>
        <RegistInfoFrame.NextButton
          disabled={isNextButtonDisabled}
          onClick={handleNextPage}
        >
          다음
        </RegistInfoFrame.NextButton>
        <RegistInfoFrame.NextButton disabled={false} onClick={handlePassSubmit}>
          나중에 입력할게요
        </RegistInfoFrame.NextButton>
        <RegistInfoFrame.info>
          정보 미입력시 기본값으로 칼로리가 계산됩니다
        </RegistInfoFrame.info>
      </RegistInfoFrame.BottomSection>
    </RegistInfoFrame.Wrap>
  );
};

export default RegistInfo;
