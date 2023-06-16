import styled from 'styled-components';
import Card from '../../components/common/Card/Card';
import { useState } from 'react';
import Button from '../../components/common/Button/Button';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../../components/common/Modal/Modal';
import AlertModal from '../../components/common/Modals/AlertModal';
import { useDeleteFeeds, useGetAllFeeds } from '../../api/feedApi';
import AdminFeedList from '../../components/Admin/components/Feeds/AdminFeedList';
import AdminFeedItem from '../../components/Admin/components/Feeds/AdminFeedItem';

const Container = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 500px;

  .title {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 700;
  }

  .delete-feed {
    width: 500px;
    position: fixed;
    top: 30px;
    left: 360px;

    height: calc(100vh - 60px);

    overflow-y: scroll;

    z-index: 100;

    ::-webkit-scrollbar {
      padding: 10px 0;
    }
  }

  .selected-feeds {
    position: relative;
    width: 600px;
    left: 40px;
    padding-bottom: 60px;

    .selected-feed {
      transition: all 0.3s;
    }

    .selected-feed:hover {
      cursor: pointer;
      transform: translateY(-6px);
      box-shadow: 0px 6px 22px -6px rgba(0, 0, 0, 0.3);
    }

    .selected-feed a {
      pointer-events: none;
    }

    button {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
`;

const AdminFeedDeletePage = () => {
  const queryClient = useQueryClient();
  const { data: allFeeds } = useGetAllFeeds();
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const { mutate, isSuccess } = useDeleteFeeds(selectedId, {
    onSuccess: () => {
      setSelectedId([]);
      setIsModalOpen(true);
      queryClient.refetchQueries(['allFeeds']);
    },
  });

  function deleteHandler() {
    mutate();
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Container>
      <Card className="delete-feed">
        <p className="title">피드 삭제</p>
        {allFeeds && allFeeds.length > 0 && (
          <AdminFeedList setSelectedId={setSelectedId} selectedId={selectedId} feeds={allFeeds} selectMode={true} />
        )}
      </Card>
      {selectedId.length > 0 && (
        <Card className="selected-feeds">
          <p className="title">선택된 목록</p>
          {allFeeds!.map((feed) => {
            if (selectedId.includes(feed._id)) {
              return (
                <div
                  className="selected-feed"
                  key={feed._id}
                  onClick={() => {
                    setSelectedId((prev) => prev.filter((id) => id !== feed._id));
                  }}
                >
                  <AdminFeedItem key={feed._id} feed={feed} />
                </div>
              );
            }
          })}
          <Button onClick={deleteHandler}>피드 삭제하기</Button>
        </Card>
      )}
      {isSuccess && isModalOpen && <AlertModal onClose={setIsModalOpen} content="피드가 삭제되었습니다!"></AlertModal>}
    </Container>
  );
};

export default AdminFeedDeletePage;
