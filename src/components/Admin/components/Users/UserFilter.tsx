import styled from 'styled-components';
import React, { Dispatch } from 'react';

interface Props {
  setFilterSetting: Dispatch<React.SetStateAction<UserFilterSettingValues>>;
  clickFilter: () => void;
  filterSetting: UserFilterSettingValues;
}

export interface UserFilterSettingValues {
  searchType: string;
  searchValue: string;
  onlyAdmin: boolean;
}

export const enum SearchTypeCase {
  id = '유저 ID',
  name = '유저 이름',
  nickname = '유저 닉네임',
}

const UserFilter = ({ setFilterSetting, clickFilter, filterSetting }: Props) => {
  return (
    <Container>
      <div className="search-box">
        <label htmlFor="search-value">
          <select
            onChange={(e) => {
              setFilterSetting((prev) => {
                return {
                  ...prev,
                  searchType: e.target.value,
                };
              });
            }}
          >
            <option value={SearchTypeCase.id}>{SearchTypeCase.id}</option>
            <option value={SearchTypeCase.name}>{SearchTypeCase.name}</option>
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
        <label>관리자 계정만</label>
        <input
          className="only-admin"
          type="checkbox"
          onChange={(e) => {
            setFilterSetting((prev) => {
              return e.target.checked
                ? {
                    ...prev,
                    onlyAdmin: true,
                  }
                : {
                    ...prev,
                    onlyAdmin: false,
                  };
            });
          }}
        />
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

      &.only-admin {
        flex-grow: 0;
      }

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

export default UserFilter;
