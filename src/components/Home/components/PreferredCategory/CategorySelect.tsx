import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CategorySelect = () => {
  return (
    <Container>
      <p className="text-notice">
        <span className="title-point">선호 카테고리</span>가 없습니다.
      </p>
      <p className="text-setting">
        <Link to={'/user/update'}>선호 카테고리 설정하기 +</Link>
      </p>
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: var(--border-radius-button);
  padding: 30px 20px 40px;
  text-align: center;
  box-shadow: #d7cdd726 0px 0px 3px 3px;

  .text-notice {
    font-size: var(--font-micro);

    .title-point {
      font-weight: var(--weight-semi-bold);
      color: var(--color-main);
      text-decoration: underline;
    }
  }

  .text-setting {
    margin-top: 20px;
    font-weight: var(--weight-semi-bold);
  }

  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

export default CategorySelect;
