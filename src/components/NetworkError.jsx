import React from 'react';
import styled from 'styled-components';

import { ContentContainer } from './StyledComponents';

const Content = styled.div`
  margin-top: 200px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;

function NetworkError() {
  return (
    <ContentContainer>
      <Content>
        <h2>Network Error!</h2>
        <p>Something went wrong, please try again later...</p>
      </Content>
    </ContentContainer>
  );
}

export default NetworkError;
