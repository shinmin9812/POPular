import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { Store } from '../../../types/store';

type Props = {
  store: Store;
};

const Container = styled.button`
  background-color: #ffffff;
`;

const TitleScrap = ({ store }: Props) => {
  const [checkScrap, setCheckScrap] = useState(false);

  async function fetchData() {
    const response = await fetch('http://34.22.81.36:3000/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.json();
  }

  const { data: user } = useQuery(['user'], fetchData);

  async function PostData() {
    const response = await fetch(`http://34.22.81.36:3000/users/${user._id}/scrapStore/${store._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scraps: [...user.scraps, store._id],
      }),
    });
    return response.json();
  }

  const { data } = useMutation(PostData);
  console.log(data);

  useEffect(() => {
    setCheckScrap(user.scraps.includes(store._id));
  }, [user, store]);

  console.log(checkScrap);
  return (
    <Container>
      <img src="/images/scrap.svg" alt="" />
    </Container>
  );
};

export default TitleScrap;
