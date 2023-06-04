import styled, { css } from 'styled-components';

const PageListWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const PageList = styled.ul`
  display: flex;
`;

const PageItem = styled.li<{ active: boolean }>`
  padding: 5px;
  width: 25px;
  text-align: center;
  ${(props) =>
    props.active &&
    css`
      color: var(--color-white);
      background-color: var(--color-main);
      border-radius: 60px;
    `};
`;

const MovementButton = styled.button`
  color: var(--color-gray);
  background: none;
  margin: 0 10px;
`;
const arr = [1, 2, 3, 4, 5];

const Pagination = ({ currPage, setPage }: { currPage: number; setPage: (page: number) => void }) => {
  return (
    <PageListWrap>
      <MovementButton
        onClick={() => {
          if (currPage !== 1) {
            setPage(currPage - 1);
          }
        }}
      >{`< Prev`}</MovementButton>
      <PageList>
        {arr.map((page) => (
          <PageItem
            key={page}
            onClick={() => {
              setPage(page);
            }}
            active={page === currPage}
          >
            {page}
          </PageItem>
        ))}
      </PageList>
      <MovementButton
        onClick={() => {
          if (currPage !== arr.length) {
            setPage(currPage + 1);
          }
        }}
      >{`Next >`}</MovementButton>
    </PageListWrap>
  );
};

export default Pagination;
