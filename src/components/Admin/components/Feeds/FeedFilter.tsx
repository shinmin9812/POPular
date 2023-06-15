import styled from 'styled-components';
import React, { Dispatch } from 'react';
import { BoardTypes } from '../../../../types/board';

interface Props {
  setFilterSetting: Dispatch<React.SetStateAction<FeedFilterSettingValues>>;
  clickFilter: () => void;
  filterSetting: FeedFilterSettingValues;
}

export interface FeedFilterSettingValues {
  searchType: SearchTypeCase;
  searchValue: string;
  board: string;
  searchBoardValue: string;
}

export const enum SearchTypeCase {
  id = '피드 ID',
  title = '피드 제목',
  author = '작성자 이름',
  nickname = '작성자 닉네임',
}

export const defaultFilterSetting: FeedFilterSettingValues = {
  searchType: SearchTypeCase.title,
  searchValue: '',
  board: '',
  searchBoardValue: '',
};

const FeedFilter = ({ setFilterSetting, clickFilter, filterSetting }: Props) => {
  return (
    <Container>
      <div className="search-box">
        <label htmlFor="search-value">
          <select
            onChange={(e) => {
              setFilterSetting((prev) => {
                return {
                  ...prev,
                  searchType: e.target.value as SearchTypeCase,
                };
              });
            }}
          >
            <option value={SearchTypeCase.id}>{SearchTypeCase.id}</option>
            <option value={SearchTypeCase.title}>{SearchTypeCase.title}</option>
            <option value={SearchTypeCase.author}>{SearchTypeCase.author}</option>
            <option value={SearchTypeCase.nickname}>{SearchTypeCase.nickname}</option>
          </select>
        </label>
        <input
          id="search-value"
          type="text"
          onChange={(e) =>
            setFilterSetting((prev) => {
              return {
                ...prev,
                searchValue: e.target.value,
              };
            })
          }
        />
      </div>
      <div className="search-box">
        <label htmlFor="search-value">
          <select
            onChange={(e) => {
              setFilterSetting((prev) => {
                return {
                  ...prev,
                  searchBoardValue: e.target.value,
                };
              });
            }}
          >
            <option value="">모든 게시판</option>
            <option value={BoardTypes.review}>후기 게시판</option>
            <option value={BoardTypes.gather}>모집 게시판</option>
            <option value={BoardTypes.free}>자유 게시판</option>
          </select>
        </label>
      </div>
      <button onClick={clickFilter}>검색</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;

  border-radius: 20px;

  .search-box {
    display: flex;

    label {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100px;
    }

    select {
      padding: 4px;
      border-radius: 10px;
      border: 1px solid #d0d0d0;
    }

    input {
      flex-grow: 1;
      height: 30px;

      padding-left: 10px;
      margin-left: 10px;

      border: none;
      border-bottom: 1px solid #c2c2c2;

      &:focus {
        outline: none;
        background-color: #f1f1f1;
      }
    }
  }

  button {
    padding: 10px;

    border-radius: 10px;
    background-color: #474747;

    color: #fff;
    font-size: 20px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export default FeedFilter;
