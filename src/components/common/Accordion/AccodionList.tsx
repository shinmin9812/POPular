import React from 'react';
import styled from 'styled-components';
import AccodionItem, { AccodionItemType } from './AccodionItem';

const Container = styled.ul`
  position: fixed;
  top: 0;
  left: 0;

  width: 300px;
  height: 100vh;

  padding: 20px 0;

  font-family: 'Noto Sans KR', sans-serif;

  background-color: #ffffff;
  box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.2);
  /* transition: all 1s; */

  .management-item {
    h2 {
      display: flex;
      align-items: center;
      width: 100%;

      padding: 14px;

      border-radius: 10px;

      font-size: 16px;
      font-weight: 400;
      color: #242424;

      /* transition: background-color 0.3s; */

      &:hover {
        cursor: pointer;
      }
    }

    .accordion {
      height: 0;
      overflow: hidden;
      font-size: 16px;
      gap: 14px;
    }

    &.on {
      h2 {
        background-color: #fcf6ff;
        font-weight: 700;
      }

      .accordion {
        display: flex;
        flex-direction: column;
        height: fit-content;
        background-color: #f4e6fc;
        padding: 10px 20px;
      }
    }
  }
`;

interface AccodionType {
  title: string;
  list: AccodionItemType[];
}

interface Props {
  Accodions: AccodionType[];
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const AccodionList = ({ setSelectedMenu, selectedMenu, Accodions }: Props) => {
  return (
    <Container className="management-list">
      {Accodions.map((item) => {
        return (
          <li
            key={item.title}
            className={`management-item ${item.title}-management ${selectedMenu === item.title ? 'on' : ''}`}
          >
            <h2
              onClick={() => {
                setSelectedMenu(`${selectedMenu === item.title ? '' : item.title}`);
              }}
            >
              {item.title}
            </h2>
            <ul className="accordion">
              {item.list.map((accodion) => {
                return <AccodionItem key={accodion.name} accodion={accodion} />;
              })}
            </ul>
          </li>
        );
      })}
    </Container>
  );
};

export default AccodionList;
