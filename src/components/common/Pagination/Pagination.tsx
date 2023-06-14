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
  cursor: pointer;

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
  cursor: pointer;
`;

const Pagination = ({
  currPage,
  setPage,
  pageGroup,
  totalPage,
}: {
  currPage: number;
  setPage: (page: number) => void;
  pageGroup: number[];
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
      >{`< `}</MovementButton>
      <PageList>
        {pageGroup.map(
          (page) =>
            page > 0 && (
              <PageItem
                key={page}
                onClick={() => {
                  setPage(page);
                }}
                active={page === currPage}
              >
                {page}
              </PageItem>
            ),
        )}
      </PageList>
      <MovementButton
        onClick={() => {
          if (currPage !== totalPage.length) {
            setPage(currPage + 1);
          }
        }}
      >{` >`}</MovementButton>
    </PageListWrap>
  );
};

export default Pagination;
