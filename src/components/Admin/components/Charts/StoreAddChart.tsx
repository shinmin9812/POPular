import { Store } from '../../../../types/store';
import dayjs from 'dayjs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

interface Props {
  stores: Store[];
}
const StoreAddChart = ({ stores }: Props) => {
  const BAR_KEY = '추가된 점포';

  const daymap = new Map();
  const convertedStores = stores.map((store) => {
    return {
      ...store,
      createdAt: dayjs(store.createdAt).format('YYYY/MM/DD'),
    };
  });

  convertedStores.forEach((store) => {
    const { createdAt } = store;
    const isExistedDate = daymap.has(createdAt);
    if (isExistedDate) {
      daymap.set(createdAt, [...daymap.get(createdAt), store]);
    } else {
      daymap.set(createdAt, [store]);
    }
  });

  let data = [];

  for (const key of daymap.keys()) {
    data.push({
      name: key,
      [BAR_KEY]: daymap.get(key).length,
    });
  }

  if (data.length > 10) {
    data = data.slice(data.length - 10, data.length);
  }

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={BAR_KEY} stackId="a" fill="#891baa" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 300px;
`;

export default StoreAddChart;
