import styled from 'styled-components';
import { Store } from '../../types/store';

type Props = {
  store?: Store;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .title-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .title-btns {
    display: flex;
    align-items: center;

    button + button {
      margin-left: 10px;
    }
  }

  .scrap-btn,
  .share-btn {
    background-color: #ffffff;
    pointer: cursor;
  }

  .title-img {
    align-self: center;
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`;

const Title = ({ store }: Props) => {
  return (
    <Container>
      <div className="title-head">
        <p className="title">{store?.title}</p>
        <div className="title-btns">
          <button className="scrap-btn">
            <img src="../../public/images/scrap.svg" alt="" />
          </button>
          <button className="share-btn">
            <img src="../../public/images/share.svg" alt="" />
          </button>
        </div>
      </div>
      {store?.images.map((image) => (
        <img className="title-img" src={image} alt="브랜드이미지" />
      ))}
    </Container>
  );
};

export default Title;
