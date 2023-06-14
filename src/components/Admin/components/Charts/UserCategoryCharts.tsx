import styled from 'styled-components';
import { User } from '../../../../types/user';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  users: User[];
}
const UserCategoryCharts = ({ users }: Props) => {
  const categoryMap = new Map();
  const BAR_KEY = '집계';

  users.forEach((user) => {
    const { interested_category } = user;
    if (interested_category.length === 0) return;
    interested_category.forEach((category) => {
      const isExistedCategory = categoryMap.has(category);
      if (isExistedCategory) {
        categoryMap.set(category, categoryMap.get(category) + 1);
      } else {
        categoryMap.set(category, 1);
      }
    });
  });

  const data = [];
  for (const [key, value] of categoryMap.entries()) {
    data.push({
      name: key,
      [BAR_KEY]: value,
    });
  }

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey={BAR_KEY} stackId="a" fill="#4b7e88" barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default UserCategoryCharts;
