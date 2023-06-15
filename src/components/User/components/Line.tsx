import styled from 'styled-components';

const Line = () => {
  return <SpaceLine></SpaceLine>;
};

const SpaceLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #f5f5f5;
  margin: 15px 0px;
`;

export default Line;
