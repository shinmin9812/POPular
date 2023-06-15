import styled from 'styled-components';
import VerticalStoreItem from './VerticalStoreItem';
import { Store } from '../../../../types/store';
import { Link } from 'react-router-dom';

interface Props {
  stores: Store[];
  text: string;
}

const VerticalStoreList = ({ stores, text }: Props) => {
  const currentDate = new Date();
  const sortedStores = stores.slice().sort(function (a, b) {
    let dateA = new Date(a.start_date);
    let dateB = new Date(b.start_date);

    let diffA = Math.abs(currentDate.getTime() - dateA.getTime());
    let diffB = Math.abs(currentDate.getTime() - dateB.getTime());

    return diffA - diffB;
  });

  return (
    <Container>
      <ContentInner>
        <TitleBox>{text}</TitleBox>
        <TitleBoxPC>
          <div className="text-box">
            <p className="title-text">{text}</p>
            <p className="sub-text">주간 인기있는 팝업스토어를 확인해보세요!</p>
            <div className="more-view">
              <Link to={`search`} className="a-link">
                More View
              </Link>
            </div>
          </div>
          <div className="box-image"></div>
        </TitleBoxPC>
        <ItemsBox>
          {sortedStores.slice(0, 4).map((store) => (
            <Item key={store._id}>
              <Link to={`/store/${store._id}`}>
                <VerticalStoreItem store={store}></VerticalStoreItem>
              </Link>
            </Item>
          ))}

          <MoreView>
            <Link className="ItemLink" to={`search`}>
              More View
            </Link>
          </MoreView>
        </ItemsBox>
      </ContentInner>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const ContentInner = styled.div`
  display: flex;
  justify-content: space-between;

  @media all and (max-width: 767px) {
    display: block;
  }
`;

const TitleBox = styled.div`
  margin-bottom: 20px;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-medium);
  display: none;

  @media all and (max-width: 767px) {
    display: block;

    font-size: var(--font-regular);
  }
`;

const TitleBoxPC = styled.div`
  width: 30%;
  background-color: rgb(160 138 185);
  margin-bottom: 9px;
  border-radius: var(--border-radius-button);
  box-sizing: border-box;
  padding: 7% 3%;
  position: relative;
  overflow: hidden;

  .text-box {
    position: relative;
    z-index: 3;
    color: var(--color-white);

    .title-text {
      font-weight: var(--weight-semi-bold);
      font-size: var(--font-medium);
    }

    .sub-text {
      font-size: var(--font-small);
      margin-top: 10px;
      opacity: 0.8;
      line-height: 20px;
    }

    .more-view {
      margin-top: 50px;
      width: 140px;
      border: 1px solid #fff;
      border-radius: var(--border-radius-input);
      text-align: center;
      transition: all 0.3s;

      .a-link {
        display: block;
        color: #fff;
        padding: 10px 10px;
        font-size: var(--font-small);
      }

      & :hover {
        border: 1px solid #fff;
        background-color: #fff;
        color: rgb(91 81 106);
        transition: all 0.3s;
      }
    }
  }

  .box-image {
    position: absolute;
    bottom: 0px;
    left: 0;
    opacity: 0.7;
    background: linear-gradient(to bottom, rgb(160 138 185), rgb(160 138 185) 10%, transparent),
      url('/images/main-back2.jpg') no-repeat;
    width: 100%;
    height: 320px;
  }

  @media all and (max-width: 767px) {
    display: none;
  }
`;

const ItemsBox = styled.ul`
  width: 68%;

  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

const Item = styled.li`
  padding: 15px 15px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  margin-bottom: 9px;
  border-radius: 5px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

const MoreView = styled.div`
  width: 100px;
  margin: 30px auto 0px;
  font-size: var(--font-small);
  color: var(--color-light-black);
  text-align: center;
  position: relative;
  cursor: pointer;
  display: none;

  @media all and (max-width: 767px) {
    display: block;
  }

  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 10px;
    background-image: url('/images/arrow.png');
    background-repeat: no-repeat;

    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-39%);
  }

  .ItemLink {
    display: inline-block;
    width: 100%;
    padding: 6px 0px;
    transform: translateY(0px);
    transition: all 0.2s;
  }

  &:hover .ItemLink {
    transform: translateY(-3px);
  }
`;

export default VerticalStoreList;
