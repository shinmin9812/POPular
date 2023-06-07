import PostRegisterButton from '../components/PostRegisterButton';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';
import { useState, useEffect } from 'react';

// 게시글 생성 스키마 확인
const PostRegisterButtonContainer = () => {
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const postTitle = useAppSelector((state) => state.WritePostSlice.postTitle);
  const postContent = useAppSelector((state) => state.WritePostSlice.postContent);
  const ratings = useAppSelector((state) => state.WritePostSlice.ratings);
  const [isMember, setIsMember] = useState();
  const currTab = tab === '자유게시판' ? 'Free' : tab === '후기게시판' ? 'Review' : 'Gather';
  const onclick = async () => {
    try {
      const response = await fetch('http://34.22.81.36:3000/feeds', {
        method: 'POST',
        body: JSON.stringify({
          title: 'a',
          author: 'a',
          board: 'Free',
          content: 'a',
          images: [],
          likes: [],
          reports: [],
          Comments: [],
        }),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

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
        setIsMember(data._id);
        return data;
      } else {
        return null;
      }
    } catch (err: any) {
      const errorMessage = err as Error;
      console.log(errorMessage);
      return null;
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <PostRegisterButton
      onClick={() => {
        onclick();
      }}
    >
      작성하기
    </PostRegisterButton>
  );
};

export default PostRegisterButtonContainer;
