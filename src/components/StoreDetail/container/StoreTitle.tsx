import styled from 'styled-components';
import Slider from 'react-slick';
import TitleScrap from '../components/TitleScrap';
import { Store } from '../../../types/store';

type Props = {
  store: Store;
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

  .slick-arrow::before {
    color: #000;
  }

  .title-img-box {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(219 219 219);
  }

  .title-img {
    align-self: center;
    width: 300px;
    object-fit: cover;
  }

  .slick-slider {
    width: 100%;
    position: relative;
  }

  @media (min-width: 450px) {
    .title-img {
      height: 400px;
    }

    .slick-slider {
      width: 300px;
    }
  }

  .slick-dots {
    position: absolute;
    bottom: 20px;
  }
`;

const StoreTitle = ({ store }: Props) => {
  const settings = {
    dots: true,
  };

  return (
    <Container>
      <div className="title-head">
        <p className="title">{store.title}</p>
        <div className="title-btns">
          <TitleScrap store={store} />
        </div>
      </div>
      <div className="title-img-box">
        <Slider {...settings}>
          {store.images.map((image: string, i: number) => (
            <img className="title-img" key={i} src={image} alt="브랜드이미지" />
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default StoreTitle;
