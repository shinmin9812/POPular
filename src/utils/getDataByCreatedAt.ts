import dayjs from 'dayjs';

interface DataValue {
  createdAt: string;
}

export default function getDataByCreatedAt(title: string, data: DataValue[]) {
  const daymap = new Map();

  const convertedUsers = data.map((item) => {
    return {
      ...item,
      createdAt: dayjs(item.createdAt).format('YYYY/MM/DD'),
    };
  });

  convertedUsers.forEach((item) => {
    const { createdAt } = item;
    const isExistedDate = daymap.has(createdAt);
    if (isExistedDate) {
      daymap.set(createdAt, [...daymap.get(createdAt), item]);
    } else {
      daymap.set(createdAt, [item]);
    }
  });

  let result = [];

  for (const key of daymap.keys()) {
    result.push({
      name: key,
      [title]: daymap.get(key).length,
    });
  }

  if (result.length > 10) {
    result = result.slice(result.length - 10, result.length);
  }

  result.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  return result;
}
