import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 24px;

  .ratings {
    display: flex;
    gap: 6px;
    font-size: 30px;
    cursor: pointer;

    .star {
      color: #a9a9a9;
      transition: all 0.4s;

      &:hover {
        transform: scale(1.2);
      }
      &.selected {
        color: var(--color-main);
      }
    }
  }
`;

const RatingContainer = () => {
  const rating = useAppSelector((state) => state.WritePostSlice.ratings);
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const dispatch = useAppDispatch();
  const setRating = (rating: number) => dispatch(WritePostSliceActions.setRating(rating));
  const RATINGS = [1, 2, 3, 4, 5];

  if (tab === '후기게시판')
    return (
      <Container>
        평점
        <div className="ratings">
          {RATINGS.map((rate) => (
            <div
              onClick={() => setRating(rate)}
              className={`star ${rating >= rate ? 'selected' : ''}`}
              data-rate={rate}
            >
              ★
            </div>
          ))}
        </div>
      </Container>
    );
  else return <div></div>;
};

export default RatingContainer;
