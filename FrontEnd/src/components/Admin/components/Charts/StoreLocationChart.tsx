import { Store } from '../../../../types/store';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';

interface Props {
  stores: Store[];
}
const StoreLocationChart = ({ stores }: Props) => {
  const PIE_KEY = '개점한 스토어 수';

  const locationMap = new Map();

  stores.forEach((store) => {
    const SIDO = store.postcode.sido;
    const isExistedLocation = locationMap.has(SIDO);
    if (isExistedLocation) {
      locationMap.set(SIDO, [...locationMap.get(SIDO), store]);
    } else {
      locationMap.set(SIDO, [store]);
    }
  });

  let data = [];

  const COLORS = ['#234589', '#00C49F', '#FFBB28', '#FF8042', '#1c588f', '#ebd194'];

  for (const key of locationMap.keys()) {
    data.push({
      name: key,
      [PIE_KEY]: locationMap.get(key).length,
    });
  }

  if (data.length > 6) {
    data = data.slice(data.length - 6, data.length);
  }

  return (
    <Container>
      <PieChart width={400} height={300}>
        <Pie data={data} cx={200} cy={130} innerRadius={50} outerRadius={100} fill="#8884d8" dataKey={PIE_KEY}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  .custom-tooltip {
    width: fit-content;
    background-color: #dfdfdf;

    padding: 5px 10px;

    font-weight: 600;
    border-radius: 20px;
  }
`;

export default StoreLocationChart;
