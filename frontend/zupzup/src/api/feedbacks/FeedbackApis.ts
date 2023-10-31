import { instance } from 'api';
import { BASE_URL } from 'api/apiController';

const FEEDBACK_URL = `${BASE_URL}/feedbacks`;

const MemberApis = {
  postFeedback: (feedback: string) => {
    instance.post(FEEDBACK_URL, feedback);
  },
  getFeedback: () => {
    instance.get(FEEDBACK_URL);
  },
};

export default MemberApis;
