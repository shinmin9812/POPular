import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { User } from '../../../../types/user';
import getDataByCreatedAt from '../../../../utils/getDataByCreatedAt';

interface Props {
  users: User[];
}
const UserAddChart = ({ users }: Props) => {
  const LINE_KEY = '가입 유저';
  const data = getDataByCreatedAt(LINE_KEY, users);

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
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
          <Line type="monotone" dataKey={LINE_KEY} stroke="#b71e1e" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 300px;
`;

export default UserAddChart;
