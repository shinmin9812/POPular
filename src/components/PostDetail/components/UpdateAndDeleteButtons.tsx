import { useState } from 'react';
import styled from 'styled-components';
import ConfirmModal from '../../common/Modals/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Button = styled.button<{ update: boolean }>`
  color: var(--color-white);
  border-radius: 8px;
  width: 55px;
  height: 35px;
  font-size: var(--font-regular);
  background-color: ${(props) => (props.update ? 'var(--color-main)' : 'var(--color-gray)')};
  margin: 5px;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    top: 85px;
  }
`;

const UpdateAndDelete = ({ deletePost, updatePost }: { deletePost: () => void; updatePost: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <ButtonWrap>
      <Button update={true} onClick={updatePost}>
        수정
      </Button>
      <Button update={false} onClick={() => setIsModalOpen(true)}>
        삭제
      </Button>
      {isModalOpen && (
        <ConfirmModal
          onClose={setIsModalOpen}
          onConfirm={() => {
            deletePost();
            navigate('/community/board');
          }}
          content="게시글을 삭제하시겠습니까?"
        />
      )}
    </ButtonWrap>
  );
};

export default UpdateAndDelete;
