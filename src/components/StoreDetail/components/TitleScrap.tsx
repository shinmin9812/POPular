import { useState, useEffect } from 'react';
import { useQueries, useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import * as React from 'react';
import { getStoreById } from '../../../api/storeApi';
import { getLoginUser } from '../../../api/userApi';

type Props = {
  storeId: string;
};

const Container = styled.button`
  background-color: #ffffff;
  cursor: pointer;
`;

const TitleScrap = React.memo(({ storeId }: Props) => {
  const [checkScrap, setCheckScrap] = useState<boolean>(false);

  const result = useQueries({
    queries: [
      { queryKey: ['store'], queryFn: () => getStoreById(storeId) },
      { queryKey: ['user'], queryFn: () => getLoginUser() },
    ],
  });

  const [storeQuery, userQuery] = result;
  const { data: store, isLoading: storeLoading } = storeQuery;
  const { data: user, isLoading: userLoading } = userQuery;

  useEffect(() => {
    if (user && store) {
      setCheckScrap(store.scraps.includes(user._id));
    }
  }, [store, user]);

  const scrapMutation = useMutation(
    () => {
      return fetch(`http://34.22.81.36:3000/users/${user._id}/scrapStore/${store._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    },
    {
      onError: () => {
        window.alert('로그인이 필요한 서비스입니다.');
      },
    },
  );

  const unscrapMutation = useMutation(() => {
    return fetch(`http://34.22.81.36:3000/users/${user._id}/unscrapStore/${store._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  });

  function scrapHandler() {
    scrapMutation.mutate();
    setCheckScrap(true);
  }

  function unscrapHandler() {
    unscrapMutation.mutate();
    setCheckScrap(false);
  }

  if (storeLoading || userLoading) return <div>Loading...</div>;

  return (
    <Container onClick={checkScrap ? unscrapHandler : scrapHandler}>
      {checkScrap ? <img src="/images/scrap-fill.svg" alt="" /> : <img src="/images/scrap.svg" alt="" />}
    </Container>
  );
});

export default TitleScrap;
