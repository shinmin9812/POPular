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

    div + div {
      margin-left: 10px;
    }
  }

  .title-img {
    align-self: center;
    width: 100vw;
    height: 390px;
  }
`;

const Title = ({ store }: Props) => {
  return (
    <Container>
      <div className="title-head">
        <p className="title">{store?.title}</p>
        <div className="title-btns">
          <div className="title-scrap">별</div>
          <div className="title-share">공유</div>
        </div>
      </div>
      <img className="title-img" src={store?.images[0]} alt="브랜드이미지" />
    </Container>
  );
};

export default Title;
