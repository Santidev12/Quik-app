import { component$, Slot, useContextProvider, useStore, useStyles$ } from "@builder.io/qwik";

import Navbar from "~/components/shared/navbar/navbar";

import styles from "./styles.css?inline";
import { PokemonProvider } from "~/context";




export default component$(() => {
  useStyles$(styles);

  return (
    <Slot/>
  );
});
