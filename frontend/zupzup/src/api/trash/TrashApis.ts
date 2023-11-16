import { instance } from 'api';
import axios from 'axios';

import { TrashcanFindRequest } from 'types';
import { COIN_TABLE_URI } from 'utils';

const TRASH_URL = `/trashcans`;

const TrashApis = {
  getTrashCans: (request: TrashcanFindRequest) =>
    instance.post(`${TRASH_URL}`, request),

  getTrashDetail: () => axios.get(COIN_TABLE_URI),
};

export default TrashApis;
