import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types";
import { getAllProducts } from "./productApi";
import { RootState } from "@reduxjs/toolkit/query";

interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  items: IProduct[];
  filteredItems: IProduct[];
  searchTerm: string | null;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ProductsState = {
  isError: false,
  isLoading: false,
  error: null,
  items: [],
  filteredItems: [],
  searchTerm: null,
  currentPage: 1,
  itemsPerPage: 4,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredItems = state.items.filter(
        (item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.description.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProducts.pending, (state: ProductsState) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    }),
      builder.addCase(
        getAllProducts.fulfilled,
        (state: ProductsState, action: PayloadAction<IProduct[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      ),
      builder.addCase(
        getAllProducts.rejected,
        (state: ProductsState, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error =
            (action.payload as string) ?? "Failed to fetch products";
        }
      );
  },
});

export const { setSearchTerm, setCurrentPage } = productsSlice.actions;

export default productsSlice.reducer;
