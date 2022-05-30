import { PokemonClient } from "pokenode-ts";

export const client = new PokemonClient({
  cacheOptions: {
    maxAge: 1000 * 60 * 30, // 30 minutes
    exclude: { query: false },
    debug: true,
  },
});
