import styled, { css } from 'styled-components';

const Tab = styled.p<{ active: boolean }>`
  text-align: center;
<<<<<<< HEAD
  font-size: var(--font-regular);
  padding-bottom: 10px;
=======
  font-size: 18px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  border-bottom: 3px solid rgba(101, 44, 193, 0.2);
>>>>>>> a852527a352eedc36ae464911c6c1416b1d41653
  width: 100%;

  + p {
    margin-left: 4px;
  }

  ${(props) =>
    props.active &&
    css`
      color: var(--color-main);
      border-bottom: 3px solid var(--color-main);
      font-size: var(--font-medium);
      @media (max-width: 420px) {
        font-size: var(--font-regular);
      }
    `}
`;

const BoardTabs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TabsWrap = ({ tabs, currTab, onClick }: { tabs: string[]; currTab: string; onClick: (tab: string) => void }) => {
  return (
    <BoardTabs>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          active={currTab === tab}
          onClick={() => {
            onClick(tab);
          }}
        >
          {tab}
        </Tab>
      ))}
    </BoardTabs>
  );
};

export default TabsWrap;
