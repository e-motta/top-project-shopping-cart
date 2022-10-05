import React from 'react';
import styled from 'styled-components';

import { ContentContainer } from './StyledComponents';

const Content = styled.div`
  margin-top: 200px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;

function NotFound() {
  return (
    <ContentContainer>
      <Content>
        <h2>Error 404: Not found!</h2>
        <p>The page you are looking for does not exist...</p>
      </Content>
    </ContentContainer>
  );
}

export default NotFound;
