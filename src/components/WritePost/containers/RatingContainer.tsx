import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import Filter from '../../common/Filter/Filter';
import Rating from '../components/Rating';

const RatingContainer = () => {
  const rating = useAppSelector((state) => state.WritePostSlice.ratings);
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const dispatch = useAppDispatch();
  const setRating = (rating: number) => dispatch(WritePostSliceActions.setRating(rating));

  if (tab === '후기게시판')
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
  else return <div></div>;
};

export default RatingContainer;
