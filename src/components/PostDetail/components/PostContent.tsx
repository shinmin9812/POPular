import styled from 'styled-components';

const PostContentWrap = styled.div`
  text-align: center;
  padding: 10px;
  border: 1px var(--color-light-gray) solid;
  border-radius: 8px;
`;

const Img = styled.img`
  width: 60%;
  height: 60%;
`;

const PostContent = ({ img, content }: { img: string | undefined; content: string }) => {
  return (
    <PostContentWrap>
      <Img src={img} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </PostContentWrap>
  );
};

export default PostContent;
