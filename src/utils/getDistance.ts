interface Props {
  centerLat: number;
  centerLng: number;
  targetLat: number;
  targetLng: number;
}

export function getDistance({ centerLat, centerLng, targetLat, targetLng }: Props) {
  const R = 6371; // 지구 반지름 (단위: km)

  const centerRadLat = (centerLat * Math.PI) / 180;
  const centerRadLng = (centerLng * Math.PI) / 180;
  const targetRadLat = (targetLat * Math.PI) / 180;
  const targetRadLng = (targetLng * Math.PI) / 180;

  const latDiff = targetRadLat - centerRadLat;
  const lngDiff = targetRadLng - centerRadLng;

  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(centerRadLat) * Math.cos(targetRadLat) * Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c * 1000;
  return distance;
}
