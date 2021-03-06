import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Container,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { apiGetStarships } from "../api";
import styles from "../styles/Home.module.css";
import { StarshipType } from "../types";

const HomeBody = () => {
  const [selectedManufacturer, setSelectedManufacturer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [starships, setStarships] = React.useState<StarshipType[]>([]);

  const onChangeSelect = React.useCallback((event: SelectChangeEvent<any>) => {
    setSelectedManufacturer(event.target.value);
  }, []);

  const manufacturers = Array.from(
    new Set(
      starships
        .map(({ manufacturer }) => manufacturer)
        .join(", ")
        .split(", ")
        .filter(({ length }) => length > 4)
    )
  );

  const fetchStarships = React.useCallback(async () => {
    setIsLoading(true);
    const starships = await apiGetStarships();
    setStarships(starships as StarshipType[]);
    setIsLoading(false);
  }, []);

  const init = React.useCallback(() => {
    fetchStarships();
  }, []);

  React.useEffect(() => {
    init();
  }, []);
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Manufacturer</InputLabel>
          <Select
            value={selectedManufacturer}
            label="Manufacturer"
            onChange={onChangeSelect}
          >
            <MenuItem value="">--</MenuItem>
            {manufacturers.map((manufacturer: string) => (
              <MenuItem key={manufacturer} value={manufacturer}>
                {manufacturer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Name",
                  "Model",
                  "Manufacturer",
                  "Class",
                  "MGLT",
                  "Length",
                ].map((label) => (
                  <TableCell key={label}>{label}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell rowSpan={2} colSpan={6}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                starships
                  ?.filter(({ manufacturer }: StarshipType) =>
                    manufacturer.includes(selectedManufacturer)
                  )
                  ?.map((starships: StarshipType, key: number) => (
                    <TableRow
                      key={String(key)}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {[
                        starships.name,
                        starships.model,
                        starships.manufacturer,
                        starships.starship_class,
                        starships.MGLT,
                        starships.length,
                      ].map((value, key: number) => (
                        <TableCell key={String(key)}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DevTown CC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container sx={{ mt: 10 }}>
          <HomeBody />
        </Container>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
