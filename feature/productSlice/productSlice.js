import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import _ from "lodash";
import haven from "../../utils/haven-api";

export const allProductsThunk = createAsyncThunk(
    'products/allProductListingThunk',
    async () => {
        const products = await Promise.resolve(haven.getAllProductsListed());
        return products;
    }
);

export const singleProductThunk = createAsyncThunk(
    'products/singleProductThunk',
    async (id) => {
        const product = await Promise.resolve(haven.getSingleProductWithImages(id));
        return product;
    }
);

export const newProductThunk = createAsyncThunk(
    'products/newProductThunk',
    async (productBody, bannerBody, allImagesBody) => {
        const product = await Promise.resolve(haven.addNewProductWithImages(productBody, bannerBody, allImagesBody));
        return product;
    }
);


const productSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        allProductsRandomized: [],
        allProductsLoading: false,
        allProductsErrors: false,

        displayCategoryList: [],

        // single product
        singleProduct: {},
        singleProductLoading: false,
        singleProductErrors: false,


        // addProduct
        newProduct: {},

        // mensProducts
        allMenProducts: [],
        mensTop: [],
        mensBottom: [],

        // womensProducts
        allWomenProducts: [],
        womensTop: [],
        womensBottom: [],

        // product listing page helper integers
        productListCount: 0,
        displayMax: 0,
        arrayChunkSize: 0,
        slideDirection: "", // either left or right

        hrefMonitor: ""

    },
    reducers: {
        displayProductCategory(state, action) {
            state.displayCategoryList = action.payload;
        },
        hrefChanger(state, action) {
            state.hrefMonitor = action.payload;
        },
        listOfAllMenProducts(state, action) {
            // console.log("redux action.payload check", action.payload);
            state.allMenProducts = action.payload.filter(products => {
                if (products.type.match(/Men/)) {
                    return products;
                }
            });
        },
        listMensTop(state, action) {
            // console.log("we are inside redux mens Top", action.payload);
            // console.log("we are inside redux look at state mensTop", state);
            state.mensTop = action.payload.filter(products => {
                if (products.type.match(/Mens Top/)) {
                    return products;
                }
            });
            // console.log("end", state.mensTop);
        },
        listMensBottoms(state, action) {
            state.mensBottom = action.payload.filter(products => {
                if (products.type.match(/Mens Bottom/)) {
                    return products;
                }
            });
        },
        listOfAllWomenProducts(state, action) {
            state.allWomenProducts = action.payload.filter(products => {
                if (products.type.match(/Wommen/)) { // spelt wrong in the backend fix to women correct spelling
                    return products;
                }
            });
        },
        listWomensTop(state, action) {
            state.womensTop = action.payload.filter(products => {
                if (products.type.match(/Wommens Top/)) { // spelt wrong in the backend fix to women correct spelling
                    return products;
                }
            });
        },
        listWomensBottoms(state, action) {
            state.womensBottom = action.payload.filter(products => {
                if (products.type.match(/Wommens Bottom/)) { // spelt wrong in the backend fix to women correct spelling
                    return products;
                }
            });
        },
        productListCounter(state, action) {
            state.productListCount = action.payload;
        },
        productDisplayMax(state, action) {
            state.displayMax = action.payload;
        },
        productArrayChunkSize(state, action) {
            state.arrayChunkSize = action.payload;
        },
        listSlideDirection(state, action) {
            state.slideDirection = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(HYDRATE, (state, action) => {

                if (!action.payload.products.allProducts ) {
                    return state;
                }

                if (!action.payload.products.allProductsRandomized) {
                    return state;
                }

                if (!action.payload.products.singleProduct ) {
                    return state;
                }

                state.allProducts = action.payload.products.allProducts;

                state.allProductsRandomized = action.payload.products.allProductsRandomized;

                state.singleProduct = action.payload.products.singleProduct;

                // state.displayMax = action.payload.products.displayMax;

            })
            .addCase(allProductsThunk.pending, (state) => {
                state.allProductsLoading = true;
                state.allProductsErrors = false;
            })
            .addCase(allProductsThunk.fulfilled, (state, action) => {
                state.allProductsLoading = false;
                state.allProductsErrors = false;
                
                state.allProducts = action.payload;
                state.allProductsRandomized = _.shuffle(action.payload);

                // console.log("inside the productSlice", state.allProducts, "inside the productSlice")
            })
            .addCase(allProductsThunk.rejected, (state) => {
                state.allProductsLoading = false;
                state.allProductsErrors = true;
            })

            .addCase(singleProductThunk.pending, (state) => {
                state.singleProductLoading = true;
                state.singleProductErrors = false;
            })
            .addCase(singleProductThunk.fulfilled, (state, action) => {
                state.singleProductLoading = false;
                state.singleProductErrors = false;

                state.singleProduct = action.payload;
            })
            .addCase(singleProductThunk.rejected, (state) => {
                state.singleProductLoading = false;
                state.singleProductErrors = true;
            })

            .addCase(newProductThunk.fulfilled, (state, action) => {
                state.newProduct = action.payload;

                state.allProducts.concat(state.newProduct);
            })
    }
})


export const { 
    listOfAllMenProducts,
    listMensTop,
    listMensBottoms,
    listOfAllWomenProducts,
    listWomensTop,
    listWomensBottoms,
    productListCounter,
    productDisplayMax,
    productArrayChunkSize,
    listSlideDirection,
    hrefChanger,
    displayProductCategory
} = productSlice.actions;


export const selectDisplayCategoryList = state => state.products.displayCategoryList;
export const selectArrayChunkSize = state => state.products.arrayChunkSize;
export const selectDisplayMax = state => state.products.displayMax;
export const selectProductListCount = state => state.products.productListCount;
export const selectSlideDirection = state => state.products.slideDirection;

export const selectAllProducts = state => state.products.allProducts;
export const selectAllProductsRandomized = state => state.products.allProductsRandomized;
export const selectAllProductsLoading = state => state.products.allProductsLoading;
export const selectAllProductsErrors = state => state.products.allProductsErrors;

export const selectSingleProduct = state => state.products.singleProduct;
export const selectSingleProductLoading = state => state.products.singleProductLoading;
export const selectSingleProductErrors = state => state.products.singleProductErrors;

export const selectNewProduct = state => state.products.newProduct;

export const selectHrefMonitor = state => state.products.hrefMonitor;


export const selectAllMensProducts = state => state.products.allMenProducts;
export const selectMensTop = state => state.products.mensTop;
export const selectMensBottom = state => state.products.mensBottom;


export const selectAllWomensProducts = state => state.products.allWomenProducts;
export const selectWomensTop = state => state.products.womensTop;
export const selectWomensBottom = state => state.products.womensBottom;

export default productSlice.reducer;