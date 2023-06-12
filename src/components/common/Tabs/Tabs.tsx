import styled, { css } from 'styled-components';

const Tab = styled.p<{ active: boolean }>`
  text-align: center;
  font-size: var(--font-regular);
  padding-bottom: 10px;
  width: 100%;
  cursor: pointer;

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
