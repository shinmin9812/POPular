import styled from 'styled-components';

const RatingWrap = styled.div`
  display: flex;
  margin-top: 10px;
  line-height: 20px;
`;

const TitleNameWrap = styled.span`
  font-size: var(--font-medium);
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

const CursorBox = styled.div`
  cursor: pointer;
  @media (max-width: 500px) {
    svg {
      width: 20px;
    }
  }
`;

const Rating = ({ children }: { children: JSX.Element }) => {
  return (
    <RatingWrap>
      <TitleNameWrap>평점 </TitleNameWrap>
      <CursorBox>{children}</CursorBox>
    </RatingWrap>
  );
};

export default Rating;
