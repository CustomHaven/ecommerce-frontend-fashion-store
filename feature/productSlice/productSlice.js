import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import _ from "lodash";
import haven from "../../utils/haven-api";

export const allProductsThunk = createAsyncThunk(
    "products/allProductListingThunk",
    async (no_params_needed, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const products = await Promise.resolve(haven.getAllProductsListed());
            return fulfillWithValue(products);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const singleProductThunk = createAsyncThunk(
    "products/singleProductThunk",
    async (id, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const product = await Promise.resolve(haven.getSingleProductWithImages(id));
            return fulfillWithValue(product);
        } catch (error) {
            throw rejectWithValue(error);
        }
    }
);

export const newProductThunk = createAsyncThunk(
    "products/newProductThunk",
    // better to do a body object, then {dispatch, getState, rejectWithValue, fulfillWithValue}
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

        singleProductStatusCode: 0,
        singleProductStatusText: "",
        singleProductStatusMessage: "",



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
        focusOneProduct: false,
        displayedProductID: "product-cards-0",

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
                if (products.type.match(/Women/)) { // spelt wrong in the backend fix to women correct spelling
                    return products;
                }
            });
        },
        listWomensTop(state, action) {
            state.womensTop = action.payload.filter(products => {
                if (products.type.match(/Womens Top/)) { // spelt wrong in the backend fix to women correct spelling
                    return products;
                }
            });
        },
        listWomensBottoms(state, action) {
            state.womensBottom = action.payload.filter(products => {
                if (products.type.match(/Womens Bottom/)) { // spelt wrong in the backend fix to women correct spelling
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
        },
        focusSingleProduct(state, action) {
            state.focusOneProduct = action.payload;
        },
        oneDisplayedProduct(state, action) {
            const oldToNewString = state.displayedProductID.replace(/\d/, action.payload);
            state.displayedProductID = oldToNewString;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(HYDRATE, (state, action) => {

                if (!action.payload.products.allProducts ) {
                    return state;
                }
                state.allProducts = action.payload.products.allProducts;

                if (!action.payload.products.allProductsRandomized) {
                    return state;
                }
                state.allProductsRandomized = action.payload.products.allProductsRandomized;

                if (!action.payload.products.singleProduct ) {
                    return state;
                }
                state.singleProduct = action.payload.products.singleProduct;


                if (!action.payload.products.allMenProducts) {
                    return state;
                }
                state.allMenProducts = action.payload.products.allMenProducts;

                if (!action.payload.products.mensBottom) {
                    return state;
                }
                state.mensBottom = action.payload.products.mensBottom;

                if (!action.payload.products.mensTop) {
                    return state;
                }
                state.mensTop = action.payload.products.mensTop;


                if (!action.payload.products.allWomenProducts) {
                    return state;
                }
                state.allWomenProducts = action.payload.products.allWomenProducts;

                if (!action.payload.products.womensBottom) {
                    return state;
                }
                state.womensBottom = action.payload.products.womensBottom;

                if (!action.payload.products.womensTop) {
                    return state;
                }
                state.womensTop = action.payload.products.womensTop;


                if (!action.payload.products.displayMax) {
                    return state;
                }
                state.displayMax = action.payload.products.displayMax;



                if (!action.payload.products.singleProductErrors) {
                    return state;
                }
                state.singleProductErrors = action.payload.products.singleProductErrors;

                if (!action.payload.products.singleProductStatusCode) {
                    return state;
                }
                state.singleProductStatusCode = action.payload.products.singleProductStatusCode;

                if (!action.payload.products.singleProductStatusText) {
                    return state;
                }
                state.singleProductStatusText = action.payload.products.singleProductStatusText;

                if (!action.payload.products.singleProductStatusMessage) {
                    return state;
                }
                state.singleProductStatusMessage = action.payload.products.singleProductStatusMessage;

            })
            .addCase(allProductsThunk.pending, (state) => {
                state.allProductsLoading = true;
                state.allProductsErrors = false;
            })
            .addCase(allProductsThunk.fulfilled, (state, action) => {
                // console.log("allproduct fullfiled addCase: ", action);
                state.allProductsLoading = false;
                state.allProductsErrors = false;
                
                state.allProducts = action.payload.data;
                state.allProductsRandomized = _.shuffle(action.payload.data);

                // console.log("inside the productSlice", state.allProducts, "inside the productSlice")
            })
            .addCase(allProductsThunk.rejected, (state) => {
                state.allProductsLoading = false;
                state.allProductsErrors = true;
            })

            .addCase(singleProductThunk.pending, (state) => {
                state.singleProductLoading = true;
                state.singleProductErrors = false;
                state.singleProductStatusCode = 300
                state.singleProductStatusText = "";
                state.singleProductStatusMessage = "";
            })
            .addCase(singleProductThunk.fulfilled, (state, action) => {
                state.singleProductLoading = false;
                state.singleProductErrors = false;

                state.singleProductStatusCode = action.payload.statusCode;
                state.singleProductStatusText = action.payload.statusText;
                state.singleProductStatusMessage = "";


                state.singleProduct = action.payload.data;
            })
            .addCase(singleProductThunk.rejected, (state, action) => {                
                state.singleProductLoading = false;
                state.singleProductErrors = true;

                state.singleProductStatusCode = action.payload.statusCode;
                state.singleProductStatusText = action.payload.statusText;
                state.singleProductStatusMessage = action.payload.message.split(":")[1].replace(/["'{}]/g, "");
                // .replace(/["message:'{}]/g, "") looks faster 
                // actually not good if the original text has a needed letters from the word message they will be removed off the string
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
    displayProductCategory,
    focusSingleProduct,
    oneDisplayedProduct
} = productSlice.actions;


export const selectDisplayCategoryList = state => state.products.displayCategoryList;
export const selectArrayChunkSize = state => state.products.arrayChunkSize;
export const selectDisplayMax = state => state.products.displayMax;
export const selectProductListCount = state => state.products.productListCount;
export const selectSlideDirection = state => state.products.slideDirection;
export const selectOneSingleProduct = state => state.products.focusOneProduct;
export const selectDisplayedProductID = state => state.products.displayedProductID;

export const selectAllProducts = state => state.products.allProducts;
export const selectAllProductsRandomized = state => state.products.allProductsRandomized;
export const selectAllProductsLoading = state => state.products.allProductsLoading;
export const selectAllProductsErrors = state => state.products.allProductsErrors;

export const selectSingleProduct = state => state.products.singleProduct;
export const selectSingleProductLoading = state => state.products.singleProductLoading;
export const selectSingleProductErrors = state => state.products.singleProductErrors;
export const selectSingleProductStatusCode = state => state.products.singleProductStatusCode;
export const selectSingleProductStatusText = state => state.products.singleProductStatusText;
export const selectSingleProductStatusMessage = state => state.products.singleProductStatusMessage;

export const selectNewProduct = state => state.products.newProduct;

export const selectHrefMonitor = state => state.products.hrefMonitor;


export const selectAllMensProducts = state => state.products.allMenProducts;
export const selectMensTop = state => state.products.mensTop;
export const selectMensBottom = state => state.products.mensBottom;


export const selectAllWomensProducts = state => state.products.allWomenProducts;
export const selectWomensTop = state => state.products.womensTop;
export const selectWomensBottom = state => state.products.womensBottom;

export default productSlice.reducer;