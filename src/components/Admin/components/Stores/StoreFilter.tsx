import styled from 'styled-components';
import { Category } from '../../../../types/category';
import React, { Dispatch } from 'react';
import { FilterSettingValues } from '../../../../pages/Admin/AdminStoreDeletePage';
import CategoryFilterTag from './CategoryFilterTag';

interface Props {
  setFilterSetting: Dispatch<React.SetStateAction<FilterSettingValues>>;
  clickFilter: () => void;
  filterSetting: FilterSettingValues;
}

export const enum SearchTypeCase {
  id = '스토어 ID',
  title = '스토어 이름',
}

export const defaultFilterSetting: FilterSettingValues = {
  searchType: SearchTypeCase.title,
  searchValue: '',
  categories: [],
  location: '',
  isEnded: false,
};

const StoreFilter = ({ setFilterSetting, clickFilter, filterSetting }: Props) => {
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
            <option value={SearchTypeCase.title}>{SearchTypeCase.title}</option>
            <option value={SearchTypeCase.id}>{SearchTypeCase.id}</option>
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
        <label htmlFor="location">지역</label>
        <input
          id="location"
          type="text"
          onChange={(e) =>
            setFilterSetting((prev) => {
              return {
                ...prev,
                location: e.target.value,
              };
            })
          }
        />
      </div>
      <div className="search-box">
        <label htmlFor="location">카테고리</label>
        <div className="categories">
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.art)}
            tag={Category.art}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.character)}
            tag={Category.character}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.clothes)}
            tag={Category.clothes}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.design)}
            tag={Category.design}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.drink)}
            tag={Category.drink}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.entertainment)}
            tag={Category.entertainment}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.finance)}
            tag={Category.finance}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.food)}
            tag={Category.food}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.tech)}
            tag={Category.tech}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.sport)}
            tag={Category.sport}
          />
          <CategoryFilterTag
            setFilterSetting={setFilterSetting}
            selected={filterSetting.categories.includes(Category.other)}
            tag={Category.other}
          />
        </div>
      </div>
      <button onClick={clickFilter}>검색</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
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

    .categories {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      width: 280px;

      margin-left: 10px;
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

export default StoreFilter;
