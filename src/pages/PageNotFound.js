import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .prompt {
    font-size: 24px;
    line-height: 36px;
    text-transform: capitalize;
  }
`;

export default function PageNotFound() {
  return (
    <Wrapper>
      <p className="prompt">404 | Page not found.</p>
    </Wrapper>
  );
}
