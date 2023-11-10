import { instance } from 'api';

import { TrashcanFindRequest } from 'types';

const TRASH_URL = `/trashcans`;

const TrashApis = {
  getTrashCans: (request: TrashcanFindRequest) =>
    instance.post(`${TRASH_URL}`, request),
};

export default TrashApis;
