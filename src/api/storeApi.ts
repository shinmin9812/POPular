import { API_PATH } from '../constants/path';

interface CoordProps {
  x: number;
  y: number;
  distance: number;
}

export const getStoreByCoord = async ({ x, y, distance }: CoordProps) => {
  console.log(`${API_PATH.STORE.GET.BY_COORD}?x=${x}&y=${y}&distance=${distance}`);
  const response = await (await fetch(`${API_PATH.STORE.GET.BY_COORD}x=${x}&y=${y}&distance=${distance}`)).json();
  return response;
};
