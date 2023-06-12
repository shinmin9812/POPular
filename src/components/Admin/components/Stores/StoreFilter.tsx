import styled from 'styled-components';
import { Category } from '../../../../types/category';

// interface FilterSettingValues {
//   searchType: string;
//   searchValue: string;
//   categories: Category[];
//   locations: string[];
//   isEnded: boolean;
// }

const StoreFilter = () => {
  // const filterSetting: FilterSettingValues = {
  //   searchType: '',
  //   searchValue: '',
  //   categories: [],
  //   locations: [],
  //   isEnded: false,
  // };

  return (
    <Container>
      <div className="search-box">
        <label htmlFor="search-value">
          <select>
            <option value="title">스토어 이름</option>
            <option value="_id">스토어 ID</option>
          </select>
        </label>
        <input id="search-value" type="text" />
      </div>
      <div className="search-box">
        <label htmlFor="location">지역</label>
        <input id="location" type="text" />
      </div>
      <div className="search-box">
        <label htmlFor="location">카테고리</label>
        <div className="categories">
          <div className="category-tag">{Category.art}</div>
          <div className="category-tag">{Category.character}</div>
          <div className="category-tag">{Category.clothes}</div>
          <div className="category-tag">{Category.design}</div>
          <div className="category-tag">{Category.drink}</div>
          <div className="category-tag">{Category.entertainment}</div>
          <div className="category-tag">{Category.finance}</div>
          <div className="category-tag">{Category.food}</div>
          <div className="category-tag">{Category.sport}</div>
          <div className="category-tag">{Category.tech}</div>
          <div className="category-tag">{Category.other}</div>
        </div>
      </div>
      <button>검색</button>
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

      .category-tag {
        width: fit-content;
        background-color: #ede4eb;
        padding: 6px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;

        &:hover {
          cursor: pointer;
        }
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

export default StoreFilter;
