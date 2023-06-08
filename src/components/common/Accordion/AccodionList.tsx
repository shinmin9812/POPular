import React from 'react';
import styled from 'styled-components';
import AccodionItem, { AccodionItemType } from './AccodionItem';

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  color: #fff;

  a {
    color: #f5c0ff;
  }

  .management-item {
    h2 {
      display: flex;
      align-items: center;
      width: 100%;

      padding: 14px;
      margin: 10px 0;

      border-radius: 20px;

      opacity: 0.9;
      font-size: 20px;
      font-weight: 500;

      transition: all 0.2s;

      &:hover {
        cursor: pointer;
        transform: translateY(-5px);
      }
    }

    .accordion {
      height: 0;
      overflow: hidden;
      font-size: 16px;
      gap: 20px;
    }

    &.on {
      h2 {
        background-color: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(20px);
        font-size: 24px;
        font-weight: 700;
      }

      .accordion {
        display: flex;
        flex-direction: column;
        height: fit-content;
        padding: 10px 20px;

        a {
          width: fit-content;
          transform-origin: left center;
          transition: all 0.2s;

          &.active {
            color: #fff;
            transform: scale(1.1);
          }
        }
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
