import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FeedFilterSettingValues, SearchTypeCase, defaultFilterSetting } from './FeedFilter';
import { Post } from '../../../../types/post';
import FeedFilter from './FeedFilter';
import AdminFeedItem from './AdminFeedItem';

export const enum StoreItemMode {
  delete = 'delete',
}

interface Props {
  feeds: Post[];
  selectMode?: boolean;
  selectedId?: string[];
  setSelectedId?: Dispatch<SetStateAction<string[]>>;
}

const AdminFeedList = ({ feeds, selectMode, selectedId, setSelectedId }: Props) => {
  const [filterSetting, setFilterSetting] = useState<FeedFilterSettingValues>(defaultFilterSetting);
  const [searchedFeeds, setSearchedFeeds] = useState<Post[]>(feeds);

  function clickFilter() {
    if (!feeds) return;
    let result = feeds;

    if (filterSetting.searchValue) {
      result = feeds.filter((feed) => {
        if (filterSetting.searchType === SearchTypeCase.id) {
          return feed._id === filterSetting.searchValue;
        } else if (filterSetting.searchType === SearchTypeCase.title) {
          return feed.title.includes(filterSetting.searchValue);
        } else if (filterSetting.searchType === SearchTypeCase.author) {
          return feed.author.name === filterSetting.searchValue;
        } else if (filterSetting.searchType === SearchTypeCase.nickname) {
          return feed.author.nickname === filterSetting.searchValue;
        }
      });
    }

    if (filterSetting.searchBoardValue) {
      result = result.filter((feed) => {
        return feed.board === filterSetting.searchBoardValue;
      });
    }

    setSearchedFeeds(result);
  }

  useEffect(() => {
    clickFilter();
  }, [feeds]);

  return (
    <Container>
      <FeedFilter setFilterSetting={setFilterSetting} clickFilter={clickFilter} filterSetting={filterSetting} />
      <ul>
        {searchedFeeds.map((feed) =>
          selectMode ? (
            <label key={feed._id}>
              <input
                checked={selectedId!.includes(feed._id) ? true : false}
                type="checkbox"
                onChange={(e) => {
                  e.target.checked
                    ? setSelectedId!((prev) => [...prev, feed._id])
                    : setSelectedId!((prev) => prev.filter((id) => id !== feed._id));
                }}
              />
              <div className={`select-box ${selectedId!.includes(feed._id) ? 'selected' : ''}`}>
                <div className="feed-item">
                  <li>
                    <AdminFeedItem feed={feed} />
                  </li>
                </div>
              </div>
            </label>
          ) : (
            <li key={feed._id}>
              <AdminFeedItem feed={feed} />
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

        .feed-item {
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

export default AdminFeedList;
