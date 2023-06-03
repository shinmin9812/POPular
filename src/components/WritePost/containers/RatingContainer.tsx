import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import Filter from '../../common/Filter/Filter';
import Rating from '../components/Rating';

const RatingContainer = () => {
  const rating = useAppSelector((state) => state.WritePostSlice.rating);
  const dispatch = useAppDispatch();
  const setRating = (rating: number) => dispatch(WritePostSliceActions.setRating(rating));

  return (
    <Rating>
      <Filter
        value={rating}
        onChange={(e) => {
          setRating(Number(e.target.value));
        }}
        Options={[1, 2, 3, 4, 5]}
        width={24}
      />
    </Rating>
  );
};

export default RatingContainer;
