import { useState, useEffect } from 'react';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import * as React from 'react';
import { getLoginUser } from '../../../api/userApi';
import { Store } from '../../../types/store';

type Props = {
  store: Store;
};

const Container = styled.button`
  background-color: #ffffff;
  color: var(--color-main);
  font-size: 30px;
  cursor: pointer;
`;

const TitleScrap = React.memo(({ store }: Props) => {
  const [checkScrap, setCheckScrap] = useState<boolean>(false);

  const {
    data: user,
    isLoading: userLoading,
    refetch,
  } = useQuery(['user'], () => getLoginUser(), {
    enabled: !!localStorage.getItem('token'),
  });

  useEffect(() => {
    if (user && store) {
      setCheckScrap(store.scraps.includes(user._id));
    }
  }, [store, user]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('a');
      refetch();
    }
  }, []);

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
    checkScrap ? unscrapMutation.mutate() : scrapMutation.mutate();
    setCheckScrap((prev) => !prev);
  }

  if (userLoading) return <></>;

  return (
    <Container
      onClick={() => {
        scrapHandler();
      }}
    >
      {checkScrap ? <div>★</div> : <div>☆</div>}
    </Container>
  );
});

export default TitleScrap;
