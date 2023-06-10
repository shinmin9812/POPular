import { Store } from '../../../../types/store';
import dayjs from 'dayjs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

interface Props {
  stores: Store[];
}
const StoreAddChart = ({ stores }: Props) => {
  const daymap = new Map();
  stores.forEach((store) => {
    store.createdAt = dayjs(store.createdAt).format('YYYY/MM/DD');
  });

  stores.forEach((store) => {
    if (daymap.has(store.createdAt)) daymap.set(store.createdAt, [...daymap.get(store.createdAt), store]);
    else daymap.set(store.createdAt, [store]);
  });

  let data = [];

  for (const key of daymap.keys()) {
    console.log(key);
    data.push({
      name: key,
      '추가된 점포': daymap.get(key).length,
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
          <Bar dataKey="추가된 점포" stackId="a" fill="#891baa" barSize={40} onClick={(e) => console.log(e)} />
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
