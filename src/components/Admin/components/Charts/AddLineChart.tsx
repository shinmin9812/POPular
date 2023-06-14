import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import getDataByCreatedAt from '../../../../utils/getDataByCreatedAt';

interface Props {
  barKey: string;
  data: any[];
}
const AddLineChart = ({ barKey, data }: Props) => {
  const convertedData = getDataByCreatedAt(barKey, data);

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={convertedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={barKey} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  height: 300px;
`;

export default AddLineChart;
