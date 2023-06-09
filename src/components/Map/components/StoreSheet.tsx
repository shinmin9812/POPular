import React from 'react';
import { Store } from '../../../types/store';
import StoreList from '../../common/Store/StoreList';
import styled from 'styled-components';

const Conatainer = styled.div`
  position: fixed;

  width: 500px;
  height: calc(100vh - var(--header-height));

  left: 0;
  bottom: 0;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  background-color: var(--color-white);
  z-index: 500;

  transition: bottom 1s;

  .opner {
    display: none;
    justify-content: center;
    align-items: center;
    top: -50px;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 500;

    border-top-left-radius: 20px;
    border-bottom: 1px solid var(--color-light-gray);
  }

  .opner::after {
    content: '';
    height: 5px;
    width: 10%;
    min-width: 80px;
    display: block;
    background-color: #c9c9c9;
  }

  .opner:hover {
    cursor: pointer;
  }

  .content {
    height: 100%;
    background-color: var(--color-white);

    .store-list {
      height: 100%;
      overflow-y: scroll;
    }
  }

  &.open {
    bottom: calc(var(--GNA-height) * 2);
  }

  @media all and (max-width: 767px) {
    height: calc(100vh - (var(--header-height) * 3));
    width: 100vw;
    bottom: calc(-100% + (var(--GNA-height) * 4) + 50px);

    .opner {
      display: flex;
    }

    .content {
      height: calc(100% + var(--GNA-height) - 50px);
    }
  }
`;

interface Props {
  stores: Store[];
  openList: boolean;
  setOpenList: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreSheet = ({ stores, openList, setOpenList }: Props) => {
  return (
    <Conatainer className={`store-list-container ${openList ? 'open' : ''}`}>
      <div
        className="opner"
        onClick={() => {
          setOpenList(!openList);
        }}
      />
      <div className="content">
        <StoreList stores={stores} />
      </div>
    </Conatainer>
  );
};

export default StoreSheet;
