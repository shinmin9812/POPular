import styled from 'styled-components';

type PostListItem = { postTitle: string; storeName?: string; postInfo: string };

const PostList = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #987fc0;
  border-radius: 8px;
  div {
    margin-top: 10px;
  }
`;

const PostTitle = styled.h4`
  font-weight: var(--weight-bold);
  font-size: var(--font-medium);
`;

const StoreNameWrap = styled.div``;

const StoreName = styled.span`
  background-color: var(--color-sub);
  color: var(--color-white);
  padding: 6px;
  border-radius: 30px;
  text-align: center;
  font-size: var(--font-micro);
`;

const PostInfo = styled.div`
  color: var(--color-gray);
  padding-top: 6px;
  font-size: var(--font-small);
`;

const PostListItem = ({ postTitle, storeName, postInfo }: PostListItem) => {
  return (
    <PostList>
      <PostTitle>{postTitle}</PostTitle>
      <StoreNameWrap>{storeName && <StoreName>{storeName}</StoreName>}</StoreNameWrap>
      <PostInfo>{postInfo}</PostInfo>
    </PostList>
  );
};

export default PostListItem;
