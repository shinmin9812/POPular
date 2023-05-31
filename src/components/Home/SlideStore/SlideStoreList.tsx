import styled from 'styled-components';
import SlideStoreItem from './SlideStoreItem';
import useHorizontalScroll from './useHorizontalScroll.tsx';
import { Store } from '../../../types/store';
import { Link } from 'react-router-dom';

interface Props {
  stores: Store[];
  text: string;
}

const SlideStoreList = ({ stores, text }: Props) => {
  const scrollRef = useHorizontalScroll();
  return (
    <Container>
      <h2>{text}</h2>
      <ul ref={scrollRef}>
        {stores.map((store) => (
          <li key={store.id}>
            <Link to={`/store/${store.id}`}>
              <SlideStoreItem store={store} />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 50px;

  h2 {
    font-weight: var(--weight-semi-bold);
    margin-bottom: 20px;
  }

  ul {
    display: flex;
    align-items: center;
    column-gap: 30px;
    height: 100%;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
  }

  ul::-webkit-scrollbar {
    display: none;
  }

  ul > li {
    scroll-snap-align: start;
  }
`;

export default SlideStoreList;
