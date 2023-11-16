import { instance } from 'api';

const ITEM_URL = `/items`;

const RecordApis = {
  //*아이템 목록 조회
  getItemList: () => instance.get(`${ITEM_URL}`),
  //*아이템 상세 조회
  getEachItem: (itemId: number) => instance.get(`${ITEM_URL}/${itemId}`),
  //*아이템 구매
  buyItem: (itemId: number) =>
    instance.patch(`${ITEM_URL}/buy?itemId=${itemId}`),
};

export default RecordApis;
