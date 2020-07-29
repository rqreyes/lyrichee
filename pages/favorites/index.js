import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { StyledSectionList } from '../../components/organisms/Styles';
import FavoriteItem from '../../components/atoms/FavoriteItem';

const StyledSection = styled.section`
  text-align: center;
  background: #fff;
  border: 0;
  border-bottom: ${({ theme }) => theme.border};
  border-radius: 0;
  padding: 20px 10px;
  margin-bottom: 10px;
`;

const StyledH2 = styled.h2`
  margin-bottom: 0;
`;

const StyledColumnOne = styled.div`
  max-width: 465px;
  margin: auto;
`;

const StyledSectionListColumnOne = styled(StyledSectionList)`
  border: ${({ theme }) => theme.border};
`;

export default () => {
  const [favoriteList, setFavoriteList] = useState([]);

  const favoriteListDisplay = favoriteList.map((favoriteItem) => (
    <FavoriteItem key={favoriteItem.trackId} favoriteItem={favoriteItem} />
  ));

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/user/favoriteList`,
          {
            params: {
              token: Cookies.get('token'),
            },
          }
        );

        setFavoriteList(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Lyrichee Favorites</title>
      </Head>
      <main>
        <StyledSection>
          <StyledH2>Favorites</StyledH2>
        </StyledSection>
        <StyledColumnOne>
          <StyledSectionListColumnOne>
            <ul>{favoriteListDisplay}</ul>
          </StyledSectionListColumnOne>
        </StyledColumnOne>
      </main>
    </>
  );
};
