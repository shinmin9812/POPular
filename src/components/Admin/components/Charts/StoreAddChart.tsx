import { Store } from '../../../../types/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import getDataByCreatedAt from '../../../../utils/getDataByCreatedAt';

interface Props {
  stores: Store[];
}
const StoreAddChart = ({ stores }: Props) => {
  const BAR_KEY = '추가된 점포';

  const data = getDataByCreatedAt(BAR_KEY, stores);

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
  width: 400px;
  height: 300px;
`;

export default StoreAddChart;
