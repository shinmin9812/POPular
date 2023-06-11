import styled from 'styled-components';

const RatingWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;

const TitleNameWrap = styled.span`
  margin-right: 5px;
  line-height: 20px;
`;

const Rating = ({ children }: { children: JSX.Element }) => {
  return (
    <RatingWrap>
      <TitleNameWrap>평점 </TitleNameWrap>
      {children}
    </RatingWrap>
  );
};

export default Rating;
