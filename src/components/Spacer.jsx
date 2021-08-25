import styled from "styled-components";

const Spacer = styled.div`
  display: block;
  height: ${(props) => props.y ?? 0}rem;
  width: ${(props) => (props.x ? props.x + "rem" : "100%")};
`;
export default Spacer;
