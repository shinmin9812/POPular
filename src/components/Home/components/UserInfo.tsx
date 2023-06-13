//import { Store } from '../types/store';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const UserInfo = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserId(data._id);
      }
    } catch (err: any) {
      throw new Error(err);
    } finally {
      setIsLoading(false); // 데이터 요청이 완료되면 로딩 상태 변경
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const getStoreData = async () => {
    if (!userId) {
      return; // userId가 비어있으면 요청을 보내지 않고 종료
    }

    const response = await fetch(`http://34.22.81.36:3000/users/${userId}`);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data;
  };

  const { data, isError } = useQuery(['userinfo'], getStoreData, {
    enabled: !!userId,
  });

  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  // 데이터가 배열이 아닌 경우 배열로 변환
  const dataArray = Array.isArray(data) ? data : [];

  return <div> {dataArray && dataArray.map((user) => <div key={user._id}>{user.interested_category}</div>)}</div>;
};

export default UserInfo;
