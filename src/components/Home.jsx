import React from 'react';
import styled from 'styled-components';
import homeImg from '../images/home-bg.jpg';

import { ContentContainer } from './StyledComponents';

const Content = styled.div`
  width: 100vw;
`;

const ImgContainer = styled.div`
  min-width: 1020px;
  height: 50vh;
  overflow: hidden;
  position: relative;
`;

const StyledImg = styled.img`
  width: 2160px;
  position: absolute;
  top: -250px;
`;

const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const StyledParagraph = styled.p`
  font-size: 20px;
  text-align: center;
  font-style: italic;
  max-width: 1020px;
  
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

function Home() {
  return (
    <ContentContainer>
      <Content>
        <ImgContainer>
          <StyledImg src={homeImg} alt="homepage image" />
        </ImgContainer>
        <ParagraphContainer>
          <StyledParagraph>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Asperiores distinctio debitis amet neque quasi qui repellat
            reprehenderit ducimus pariatur laborum. Exercitationem quaerat
            optio nulla. Consectetur sed in sunt quisquam sint dolores
            voluptatem voluptate amet repudiandae a velit id officiis delectus
            expedita placeat deserunt architecto, ratione est tempore non saepe.
          </StyledParagraph>
          <StyledParagraph>
            Nulla, nam deleniti itaque ea omnis quidem facere nobis tempore!
          </StyledParagraph>
        </ParagraphContainer>
      </Content>
    </ContentContainer>
  );
}

export default Home;
