import { instance } from 'api';

const FEEDBACK_URL = `/feedbacks`;

const MemberApis = {
  postFeedback: (feedback: string) => {
    instance.post(FEEDBACK_URL, feedback);
  },
  getFeedback: () => {
    instance.get(FEEDBACK_URL);
  },
};

export default MemberApis;
