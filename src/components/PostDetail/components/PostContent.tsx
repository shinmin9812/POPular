import styled from 'styled-components';
import StarIcon from '../../common/Icons/StarIcon';
const PostContentWrap = styled.div`
  padding: 10px;
  border: 1px var(--color-light-gray) solid;
  border-radius: 8px;
`;

const PostContent = ({ content, rating }: { content: string; rating: number | undefined }) => {
  return (
    <PostContentWrap>
      {rating && (
        <div>
          평점:
          {Array(rating)
            .fill(0)
            .map((i, index) => (
              <StarIcon key={index} />
            ))}
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </PostContentWrap>
  );
};

export default PostContent;
