import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SearchTypeCase, UserFilterSettingValues } from './UserFilter';
import UserFilter from './UserFilter';
import { User } from '../../../../types/user';
import AdminUserItem from './AdminUserItem';

export const enum StoreItemMode {
  delete = 'delete',
}

interface Props {
  users: User[];
  selectMode?: boolean;
  selectedId?: string[];
  setSelectedId?: Dispatch<SetStateAction<string[]>>;
}

const defaultFilterSetting: UserFilterSettingValues = {
  searchType: SearchTypeCase.id,
  searchValue: '',
  onlyAdmin: false,
};

const AdminUserList = ({ users, selectMode, selectedId, setSelectedId }: Props) => {
  const [filterSetting, setFilterSetting] = useState<UserFilterSettingValues>(defaultFilterSetting);
  const [searchedUsers, setSearchedUsers] = useState<User[]>(users);

  function clickFilter() {
    if (!users) return;
    let result = users;

    if (filterSetting.searchValue) {
      result = users.filter((user) => {
        if (filterSetting.searchType === SearchTypeCase.id) {
          return user._id === filterSetting.searchValue;
        } else if (filterSetting.searchType === SearchTypeCase.name) {
          return user.name.includes(filterSetting.searchValue);
        } else if (filterSetting.searchType === SearchTypeCase.nickname) {
          return user.nickname.includes(filterSetting.searchValue);
        }
      });
    }

    if (filterSetting.onlyAdmin) {
      result = result.filter((user) => user.role === 'admin');
    }

    setSearchedUsers(result);
  }

  useEffect(() => {
    clickFilter();
  }, [users]);

  return (
    <Container>
      <UserFilter setFilterSetting={setFilterSetting} clickFilter={clickFilter} filterSetting={filterSetting} />
      <ul>
        {searchedUsers.map((user) =>
          selectMode ? (
            <label key={user._id}>
              <input
                checked={selectedId!.includes(user._id) ? true : false}
                type="checkbox"
                onChange={(e) => {
                  e.target.checked
                    ? setSelectedId!((prev) => [...prev, user._id])
                    : setSelectedId!((prev) => prev.filter((id) => id !== user._id));
                }}
              />
              <div className={`select-box ${selectedId!.includes(user._id) ? 'selected' : ''}`}>
                <div className="user-item">
                  <li>
                    <AdminUserItem user={user} />
                  </li>
                </div>
              </div>
            </label>
          ) : (
            <li key={user._id}>
              <AdminUserItem user={user} />
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

        .user-item {
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

export default AdminUserList;
