import Head from 'next/head';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import {
  StyledH2,
  StyledUl,
  StyledSectionHeader,
  StyledColumnOne,
  StyledSectionList,
} from '../../components/styles/Styles';
import Loading from '../../components/atoms/Loading';
import Header from '../../components/organisms/Header';
import FavoriteItem from '../../components/atoms/FavoriteItem';

export default () => {
  const { data, error } = useSWR(
    `/api/user/favoriteList?token=${Cookies.get('token')}`
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;

  const favoriteListDisplay = data.map((favoriteItem) => (
    <FavoriteItem key={favoriteItem.trackId} favoriteItem={favoriteItem} />
  ));

  return (
    <>
      <Head>
        <title>Lyrichee Favorites</title>
      </Head>
      <Header />
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
