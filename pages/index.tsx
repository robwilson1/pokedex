import type { InferGetStaticPropsType } from "next";
import type { Pokemon } from "pokenode-ts";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { client } from "../util/pokemon-client";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Box, Center, Grid, GridItem, Text } from "@chakra-ui/react";
// import backupPokemon from "../data/pokemon.json";

export const getStaticProps = async () => {
  const fetchAllPokemon = Array.from({ length: 151 }).map((_, idx) =>
    client.getPokemonById(idx + 1)
  );

  const pokemon = await Promise.all(fetchAllPokemon);

  // const pokemon = (backupPokemon as any).data;

  return {
    props: {
      pokemon,
    },
  };
};

const PokemonRow = ({
  index,
  style,
  data,
}: {
  index: number;
  style: any;
  data: Pokemon[];
}) => {
  const pokemon = data[index];

  return (
    <div style={{ ...style, height: "100%" }} className={styles.list}>
      <Grid
        templateColumns="repeat(36, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={1}
      >
        <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px">
          <Center height="100%">#{pokemon.id}</Center>
        </GridItem>
        <GridItem
          colSpan={6}
          rowSpan={1}
          bg="gray.800"
          borderRadius="5px"
          textAlign="center"
        >
          {pokemon.sprites.front_default ? (
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={100}
              height={100}
            />
          ) : null}
        </GridItem>
        <GridItem
          colSpan={6}
          rowSpan={1}
          bg="gray.800"
          borderRadius="5px"
          textAlign="center"
        >
          <Center height="100%">{pokemon.name}</Center>
        </GridItem>
        <GridItem
          colSpan={6}
          rowSpan={1}
          bg="gray.800"
          borderRadius="5px"
          textAlign="center"
        >
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </GridItem>
        <GridItem
          colSpan={6}
          rowSpan={1}
          bg="gray.800"
          borderRadius="5px"
          textAlign="center"
        >
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </GridItem>
        <GridItem
          colSpan={6}
          rowSpan={1}
          bg="gray.800"
          borderRadius="5px"
          textAlign="center"
        >
          {pokemon.stats.map((stat) => stat.base_stat).join(", ")}
        </GridItem>
      </Grid>
    </div>
  );
};

function Home({ pokemon }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        padding="100px"
        bg="gray.900"
        width="100vw"
        color="white"
        height="100vh"
      >
        <Grid
          templateColumns="repeat(36, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={1}
          paddingBottom="1"
        >
          <GridItem
            colSpan={6}
            rowSpan={2}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">No.</Center>
          </GridItem>
          <GridItem
            colSpan={6}
            rowSpan={2}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">Pic</Center>
          </GridItem>
          <GridItem
            colSpan={6}
            rowSpan={2}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">Name</Center>
          </GridItem>
          <GridItem
            colSpan={6}
            rowSpan={2}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">Type</Center>
          </GridItem>
          <GridItem
            colSpan={6}
            rowSpan={2}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">Abilities</Center>
          </GridItem>
          <GridItem
            colSpan={6}
            rowSpan={1}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">Base Stats</Center>
          </GridItem>
          <GridItem
            colSpan={1}
            rowSpan={1}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">HP</Center>
          </GridItem>
          <GridItem
            colSpan={1}
            rowSpan={1}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">Att</Center>
          </GridItem>
          <GridItem
            colSpan={1}
            rowSpan={1}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">Def</Center>
          </GridItem>
          <GridItem
            colSpan={1}
            rowSpan={1}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">S.Att</Center>
          </GridItem>
          <GridItem
            colSpan={1}
            rowSpan={1}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">S.Def</Center>
          </GridItem>
          <GridItem
            colSpan={1}
            rowSpan={1}
            bg="#2b4f01"
            borderRadius="5px"
            textAlign="center"
          >
            <Center height="100%">Spd</Center>
          </GridItem>
        </Grid>

        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              className="list"
              width={width}
              height={height}
              itemCount={pokemon.length}
              itemData={pokemon}
              itemSize={100}
            >
              {({ style, data, index }) => (
                <PokemonRow style={style} data={data} index={index} />
              )}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </div>
  );
}

export default Home;
