import axios from "axios"
import { Product } from "./types"
import Papa from 'papaparse'

export default {
    list: async(): Promise<Product[]> =>{
        return axios.get(
            `https://docs.google.com/spreadsheets/d/e/2PACX-1vRqVawGQVTRUkXkdISdFSAH_Caq1usT8Pw_S1VNXBAq1j5X7IgceBZvmwkhi7zDx9jFIXOV2h-kPrUc/pub?output=csv`,
            {responseType:'blob',},
            ).then(
                (response) => 
                new Promise <Product[]>((resolve, reject) =>{
                    Papa.parse(response.data, {
                        header:true,
                        complete: (results) => resolve(results.data as Product[]),
                        error:(error) => reject (error.message),
                    });
                }),
            );
    },
};
