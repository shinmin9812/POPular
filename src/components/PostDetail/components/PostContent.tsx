import styled from 'styled-components';
import StarIcon from '../../common/Icons/StarIcon';
const PostContentWrap = styled.div`
  padding: 10px;
  border: 1px var(--color-light-gray) solid;
  border-radius: 8px;
`;

const Img = styled.img`
  width: 60%;
  height: 60%;
`;

const PostContent = ({ img, content, rating }: { img: string | undefined; content: string; rating: number[] }) => {
  return (
    <PostContentWrap>
      <div>
        평점:
        {rating.map((i, index) => (
          <StarIcon key={index} />
        ))}
      </div>
      <Img src={img} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </PostContentWrap>
  );
};

export default PostContent;
