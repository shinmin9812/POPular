import { Store } from '../../../../types/store';
import styled from 'styled-components';
import AdminStoreItem from './AdminStoreItem';
import { Dispatch, SetStateAction } from 'react';
import StoreFilter from './StoreFilter';

interface Props {
  stores: Store[];
  selectMode?: boolean;
  selectedId?: string[];
  setSelectedId?: Dispatch<SetStateAction<string[]>>;
}

const AdminStoreList = ({ stores, selectMode, selectedId, setSelectedId }: Props) => {
  return (
    <Container>
      <StoreFilter />
      <ul>
        {stores.map((store) =>
          selectMode ? (
            <label key={store._id}>
              <input
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
