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
  line-height: 15px;
  text-align: center;
  margin: 0 3px;
  ${(props) =>
    props.active &&
    css`
      color: var(--color-white);
      background-color: var(--color-main);
      border-radius: 100%;
    `};
`;

const MovementButton = styled.button`
  color: var(--color-gray);
  background: none;
  margin: 0 10px;
`;

const Pagination = ({
  currPage,
  setPage,
  totalPage,
}: {
  currPage: number;
  setPage: (page: number) => void;
  totalPage: number[];
}) => {
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
        {totalPage.map((page) => (
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
          if (currPage !== totalPage.length) {
            setPage(currPage + 1);
          }
        }}
      >{`Next >`}</MovementButton>
    </PageListWrap>
  );
};

export default Pagination;
