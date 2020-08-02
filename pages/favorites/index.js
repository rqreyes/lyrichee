import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  StyledH2,
  StyledUl,
  StyledSectionHeader,
  StyledColumnOne,
  StyledSectionList,
} from '../../components/styles/Styles';
import FavoriteItem from '../../components/atoms/FavoriteItem';

export default () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const router = useRouter();

  const favoriteListDisplay = favoriteList.map((favoriteItem) => (
    <FavoriteItem key={favoriteItem.trackId} favoriteItem={favoriteItem} />
  ));

  useEffect(() => {
    (async () => {
      try {
        if (!Cookies.get('token')) router.push('/signin');

        const { data } = await axios.get('/api/user/favoriteList', {
          params: {
            token: Cookies.get('token'),
          },
        });

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
        <StyledSectionHeader>
          <StyledH2>Favorites</StyledH2>
        </StyledSectionHeader>
        <StyledColumnOne>
          <StyledSectionList>
            <StyledUl>{favoriteListDisplay}</StyledUl>
          </StyledSectionList>
        </StyledColumnOne>
      </main>
    </>
  );
};
