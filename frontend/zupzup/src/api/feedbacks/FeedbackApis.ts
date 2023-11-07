import { instance } from 'api';

const FEEDBACK_URL = `/feedbacks`;

const MemberApis = {
  postFeedback: (contents: string) => {
    instance.post(FEEDBACK_URL, { content: contents });
  },
  getFeedback: () => {
    instance.get(FEEDBACK_URL);
  },
};

export default MemberApis;
