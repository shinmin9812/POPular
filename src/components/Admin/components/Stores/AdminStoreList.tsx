import { Store } from '../../../../types/store';
import styled from 'styled-components';
import AdminStoreItem from './AdminStoreItem';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import StoreFilter, { SearchTypeCase, defaultFilterSetting } from './StoreFilter';
import { FilterSettingValues } from '../../../../pages/Admin/AdminStoreDeletePage';

export const enum StoreItemMode {
  delete = 'delete',
}

interface Props {
  stores: Store[];
  selectMode?: boolean;
  selectedId?: string[];
  setSelectedId?: Dispatch<SetStateAction<string[]>>;
}

const AdminStoreList = ({ stores, selectMode, selectedId, setSelectedId }: Props) => {
  const [filterSetting, setFilterSetting] = useState<FilterSettingValues>(defaultFilterSetting);
  const [searchedStores, setSearchedStores] = useState<Store[]>(stores);

  function clickFilter() {
    if (!stores) return;
    let result = stores;

    if (filterSetting.searchValue) {
      result = stores.filter((store) => {
        if (filterSetting.searchType === SearchTypeCase.id) {
          return store._id === filterSetting.searchValue;
        } else if (filterSetting.searchType === SearchTypeCase.title) {
          return store.title.includes(filterSetting.searchValue);
        }
      });
    }

    if (filterSetting.location) {
      result = result.filter((store) => store.location.includes(filterSetting.location));
    }

    if (filterSetting.categories.length > 0) {
      result = result.filter((store) => filterSetting.categories.includes(store.category));
    }

    setSearchedStores(result);
  }

  useEffect(() => {
    clickFilter();
  }, [stores]);

  return (
    <Container>
      <StoreFilter setFilterSetting={setFilterSetting} clickFilter={clickFilter} filterSetting={filterSetting} />
      <ul>
        {searchedStores.map((store) =>
          selectMode ? (
            <label key={store._id}>
              <input
                defaultChecked={selectedId!.includes(store._id) ? true : false}
                type="checkbox"
                onChange={(e) => {
                  e.target.checked
                    ? setSelectedId!((prev) => [...prev, store._id])
                    : setSelectedId!((prev) => prev.filter((id) => id !== store._id));
                }}
              />
              <div className={`select-box ${selectedId!.includes(store._id) ? 'selected' : ''}`}>
                <div className="store-item">
                  <li>
                    <AdminStoreItem store={store} />
                  </li>
                </div>
              </div>
            </label>
          ) : (
            <li key={store._id}>
              <AdminStoreItem store={store} />
            </li>
          ),
        )}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;

    label {
      display: flex;

      input {
        transform: scale(1.3);
        margin-right: 14px;
      }

      .select-box {
        display: flex;
        width: 100%;

        padding-left: 10px;
        border-radius: 10px;

        transition: all 0.3s;

        .store-item {
          pointer-events: none;
        }

        &:hover {
          cursor: pointer;
          transform: translateY(-6px);
          box-shadow: 0px 6px 22px -6px rgba(0, 0, 0, 0.3);
        }

        &.selected {
          background-color: #faedff;
        }
      }
    }
  }
`;

export default AdminStoreList;
