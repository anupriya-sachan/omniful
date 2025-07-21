import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('https://jsonfakery.com/products/random/10'); 
      return data;
    }
  });
}
