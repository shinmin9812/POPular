import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import Rating from '../components/Rating';
import { useState } from 'react';
import StarIcon from '../../common/Icons/StarIcon';
const RatingContainer = () => {
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const dispatch = useAppDispatch();
  const setRating = (rating: number) => dispatch(WritePostSliceActions.setRating(rating));

  const array = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([true, false, false, false, false]);

  const handleStarClick = (index: number) => {
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  if (tab === '후기게시판')
    return (
      <Rating>
        <div>
          {array.map((item) => (
            <span
              key={item}
              onClick={() => {
                handleStarClick(item);
                setRating(item + 1);
              }}
            >
              <StarIcon fill={clicked[item] ? 'var(--color-sub)' : 'var(--color-gray)'} />
            </span>
          ))}
        </div>
      </Rating>
    );
  else return <div></div>;
};

export default RatingContainer;
