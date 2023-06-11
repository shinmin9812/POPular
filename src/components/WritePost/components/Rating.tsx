import styled from 'styled-components';

const RatingWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rating = ({ children }: { children: JSX.Element }) => {
  return <RatingWrap>평점{children}</RatingWrap>;
};

export default Rating;
