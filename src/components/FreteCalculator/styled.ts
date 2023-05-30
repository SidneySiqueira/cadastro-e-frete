import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 100px;
`;

export const Title = styled.h2`
  color: white;
`;

export const ParamBox = styled.div`
  margin: 1rem;
  color: white;

  label {
    color: white;
  }

  fieldset {
    border-color: white;
  }
`;

export const ButtonLogin = styled.button`
  min-width: 230px;
  border-radius: 10px;
  height: 50px;
  color: white;
  background: green;
  :hover {
    cursor: pointer;
    background: darkgreen;
  }
`;

export const Total = styled.h3`
  color: white;
`;
