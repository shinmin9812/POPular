import React, { Dispatch } from 'react';
import { Category } from '../../../../types/category';
import { FilterSettingValues } from '../../../../pages/Admin/AdminStoreDeletePage';
import styled from 'styled-components';

const Container = styled.div`
  width: fit-content;
  background-color: #ede4eb;
  padding: 6px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;

  &.selected {
    background-color: #9b5d8e;
    color: #fff;
  }

  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  selected: boolean;
  tag: Category;
  setFilterSetting: Dispatch<React.SetStateAction<FilterSettingValues>>;
}

const CategoryFilterTag = ({ selected, tag, setFilterSetting }: Props) => {
  return (
    <Container
      onClick={() => {
        selected
          ? setFilterSetting((prev) => {
              return {
                ...prev,
                categories: prev.categories.filter((category) => category !== tag),
              };
            })
          : setFilterSetting((prev) => {
              return {
                ...prev,
                categories: [...prev.categories, tag],
              };
            });
      }}
      className={`category-tag ${selected ? 'selected' : ''}`}
    >
      {tag}
    </Container>
  );
};

export default CategoryFilterTag;
