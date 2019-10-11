import React from 'react';
import styled from 'styled-components/macro';
import Hero from './Hero';
import culturePhoto from '../assets/images/culture.jpg';
import divider from '../assets/images/whygnv-divider.jpg';

const WhyGainesvilleContainer = styled.div``;

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }
`;

const HeroContent = styled.div`
  max-width: 725px;
  margin: 0 auto;
  padding: 120px 0;
  text-align: center;
`;

const CultureContainer = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 80px 0 60px;
`;

const CultureContent = styled.div`
  position: relative;
  max-width: 425px;
  padding: 60px;
  box-shadow: 4px 5px 13px rgba(180, 180, 180, 0.24);
  box-sizing: border-box;
  background-color: white;
  z-index: 10;
`;

const CulturePhoto = styled.img`
  position: absolute;
  max-width: 687px;
  top: 0;
  right: 0;
  x-index: 1;
`;

const Divider = styled.div`
  height: 210px;
  background: url(${divider});
  background-size: cover;
  background-position: center;
`;

const WhyGainesvillePage = () => (
  <WhyGainesvilleContainer>
    <Hero size="medium">
      <HeroHeadline>
        Gainesville <strong>101</strong>
      </HeroHeadline>
    </Hero>
    <HeroContent>
      <h2>A City Rich in History</h2>
      <p>
        Gainesville. The Swamp. Home of: UF, the 8th best public university in
        America; Santa Fe, the #1 college in America; Sid Martin Biotech, the #1
        biotech incubator in the world; a town full of enticingly small cocktail
        bars, top-tier breweries (that partner with butterflies to brew pale
        ales) and niche dining spots; the origin of Tom Petty and Gatorade; one
        of the most cutting edge research hospitals in the world--UFHealth, and
        a slough of collaborative and engaging events that take place in and
        around these institutions (plus the institutions we’ve failed to
        mention). GNV is nature, academic rigor and constantly unfolding
        ideation packed into one community waiting for you to come and
        contribute.
      </p>
    </HeroContent>
    <CultureContainer>
      <CultureContent>
        <h2>Culture of Ideation & Experimentation</h2>
        <p>
          GNV’s history of spinning out a varied collection of businesses and
          products is sustained by a community that’s build on ideation and
          experimentation. The spaces within and between citadels of creativity
          like Cade Museum, the Hub, Optym, San Felasco Tech City and more is
          navigated by one of the most educated communities in the nation.
          Residing at the intersection of the rigorous work and experimental
          thinking makes GNV a community that values divergent thinking like
          yours.
        </p>
      </CultureContent>
      <CulturePhoto src={culturePhoto} />
    </CultureContainer>
    <Divider />
    <h2>Nature-Minded</h2>
    <p>
      There is no shortage of natural resources or nature minded projects to be
      proud of if you live in “The Swamp”. GNV has some of the highest density
      of freshwater springs in the world--where the water stays 72º F year
      round. There are wide plains where wild bison, horses and alligators run
      (and swim) about like you’re not even there. IFAS (UF’s Institute for Food
      and Agricultural Science) is a 140 year-old institution with hundreds of
      facilities around the world working extremely cool research projects aimed
      at protecting our environment while feeding the world. Whether you want to
      recuperate with nature or engage productively in sustainability projects,
      GNV has a place in nature for you.
    </p>
    <h2>Is GNV right for your family?</h2>
    <p>
      There is no chapter of family life that GNV is not equipped for. Alachua
      County Public Schools produces students that score some of the highest SAT
      scores in the state, and even the nation. Remarkable health institutions
      like UF Health and North Florida Regional Medical Center will give you
      family the highest quality personalized care. Locations like the Cade
      Museum, Harn Museum of Art, Depot Park, Hippodrome Theater, Florida
      Natural History Museum and more will always have a collection of engaging
      events that cater to kids of all ages (as well as the parents!).
      Ichetucknee Springs, Loblolly Trail, Rainbow Springs and San Felasco are
      just a few examples of pristine nature spots ideal for family outings.
    </p>
  </WhyGainesvilleContainer>
);

export default WhyGainesvillePage;