import { Post } from '../../../../types/post';
import PostItem from '../../../common/Post/PostItem';
import styled from 'styled-components';

interface Props {
  feeds: Post[];
}

const Container = styled.div`
  height: 300px;
  overflow-y: scroll;

  ul {
    height: fit-content;
  }
`;

const FeedViewsChart = ({ feeds }: Props) => {
  const sortedFeed = feeds.sort((a, b) => b.views - a.views).slice(0, 10);
  return (
    <Container>
      <ul>
        {sortedFeed.map((feed) => (
          <a key={feed._id} target="_blank" href={`/community/post/${feed._id}`}>
            <PostItem post={feed} />
          </a>
        ))}
      </ul>
    </Container>
  );
};

export default FeedViewsChart;
