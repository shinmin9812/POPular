import { Store } from '../../../../types/store';
import { PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';

interface Props {
  stores: Store[];
}

const StoreLocationChart = ({ stores }: Props) => {
  const locationMap = new Map();

  stores.forEach((store) => {
    if (locationMap.has(store.postcode.sido))
      locationMap.set(store.postcode.sido, [...locationMap.get(store.postcode.sido), store]);
    else locationMap.set(store.postcode.sido, [store]);
  });

  let data = [];

  const COLORS = ['#234589', '#00C49F', '#FFBB28', '#FF8042'];

  for (const key of locationMap.keys()) {
    console.log(key);
    data.push({
      name: key,
      지역: locationMap.get(key).length,
    });
  }

  if (data.length > 10) {
    data = data.slice(data.length - 10, data.length);
  }

  return (
    <Container>
      <PieChart width={400} height={300}>
        <Pie data={data} cx={200} cy={150} innerRadius={50} outerRadius={100} fill="#8884d8" dataKey="지역">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;

export default StoreLocationChart;
