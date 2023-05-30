import { Button } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  padding: 0.625rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  padding: 0.625rem;

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99;

  border: 0.125rem solid gray;
  border-radius: 10px;
  transform: translate(-50%, -50%);

  @media (min-width: 768px) {
    width: 31.25rem;
    max-height: 40.625rem;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1rem;
  label {
    color: white;
  }

  fieldset {
    border-color: white;
  }
`;

export const ButtonLogin = styled.button`
  border-radius: 10px;
  height:  50px;
  color: white ;
  background: green;
  :hover {
    cursor: pointer;
    background: darkgreen;

  }
`;

export const ButtonCancel = styled.button`
  border-radius: 10px;
  height:  50px;
  color: white;
  background: red;
  :hover {
    cursor: pointer;
    background: darkred;

  }
`;
