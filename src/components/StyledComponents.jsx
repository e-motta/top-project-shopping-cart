import styled from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f7eeee;
  min-height: calc(100vh - 67px);
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const StyledH2EntireBackground = styled.h2`
  background-color: #f7eeee;
  text-align: center;
  margin: 0;
  padding: 50px;
  min-height: calc(100vh - 67px);
`;

const StyledButton = styled.button`
  border-width: 0;
  background-color: inherit;
  cursor: pointer;
`;

const Button = styled.button`
  text-transform: uppercase;
  border: 0px;
  border-radius: 5px;
  font-size: 1.1em;
  padding: 10px 40px;
  cursor: pointer;
`;

const SubmitButton = styled(Button).attrs({ type: 'submit' })`
  background-color: green;
  color: white;
  transition: scale .1s;
  &:active {
    scale: 97%;
    transition: scale .1s;
  }
`;

const Loading = styled(StyledH2EntireBackground)`
  color: black;
`;

const ServerError = styled(StyledH2EntireBackground)`
  color: #360808;
`;

export {
  ContentContainer, Image, StyledButton, SubmitButton, Loading, ServerError,
};
