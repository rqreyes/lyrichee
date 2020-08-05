import Head from 'next/head';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import {
  StyledH2,
  StyledH3,
  StyledP,
  StyledUl,
  StyledSectionHeader,
  StyledColumnOne,
  StyledSectionList,
} from '../../components/styles/Styles';
import Error500 from '../../components/organisms/Error500';
import Loading from '../../components/atoms/Loading';
import Header from '../../components/organisms/Header';
import FavoriteItem from '../../components/atoms/FavoriteItem';

const StyledDivWelcome = styled.div`
  text-align: center;
  margin-top: 10vh;
`;

export default () => {
  const { data, error } = useSWR(
    `/api/user/favoriteList?token=${Cookies.get('token')}`
  );

  if (error) return <Error500 />;

  let favoriteListDisplay;

  if (data) {
    favoriteListDisplay = data.length ? (
      <StyledColumnOne>
        <StyledSectionList>
          <StyledUl>
            {data.map((favoriteItem) => (
              <FavoriteItem
                key={favoriteItem.trackId}
                favoriteItem={favoriteItem}
              />
            ))}
          </StyledUl>
        </StyledSectionList>
      </StyledColumnOne>
    ) : (
      <StyledDivWelcome>
        <StyledH3>Welcome to the fam!</StyledH3>
        <StyledP alignCenter>
          Tracks that are favorited with a star will appear here
        </StyledP>
      </StyledDivWelcome>
    );
  }

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
        {favoriteListDisplay}
      </main>
      <Loading data={data} />
    </>
  );
};
