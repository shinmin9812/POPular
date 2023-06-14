import React from 'react';
import { Post } from '../../../../types/post';

interface Props {
  feeds: Post[];
}

const FeedViewsChart = ({ feeds }: Props) => {
  const sortedFeed = feeds.sort((a, b) => b.views - a.views).slice(0, 10);
  console.log(sortedFeed);
  return <div></div>;
};

export default FeedViewsChart;
