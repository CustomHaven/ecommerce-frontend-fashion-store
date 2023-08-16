import { listOfAllMenProducts, listMensBottoms, listMensTop,
    listOfAllWomenProducts, listWomensBottoms, listWomensTop,
    displayProductCategory } from "../feature/productSlice/productSlice";

export const productCategoriesSeparator = (paramStore, allProducts, pagePath, setProductCategory, symbolHolder, server, dispatch) => {
    console.log("pagePath", pagePath);
    console.log("server", server);
    symbolHolder = pagePath.replace(/^(\w).+(\b\w).+/g, "$1$2").toLowerCase();
    if (!allProducts) {
        console.log("pagePath", pagePath.replace(/^(\w).+(\b\w).+/g, "$1$2"));
        if (server) {
            setProductCategory = []
        } else {
            setProductCategory(null)
        }
        return {
            productCategory: server ? setProductCategory : null,
            symbolHolder
        };
    }

    if (!server) {
        switch (pagePath) {
            case "men all":
                dispatch(listOfAllMenProducts(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
                setProductCategory("men all");
                break;
            case "men bottom":
                dispatch(listMensBottoms(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
                setProductCategory("men bottom");
                break;
            case "men top":
                dispatch(listMensTop(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
                setProductCategory("men top");
                break;
            case "women all":
                dispatch(listOfAllWomenProducts(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
                setProductCategory("women all");
                break;
            case "women bottom":
                dispatch(listWomensBottoms(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
                setProductCategory("women bottom");
                break;
            case "women top":
                dispatch(listWomensTop(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
                setProductCategory("women top");
                break;
            default:
                setProductCategory(null);
                symbolHolder = "";
                break;
        }
        return {
            symbolHolder
        };

    }


    switch (pagePath) {
        case "men all":
            paramStore.dispatch(listOfAllMenProducts(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            setProductCategory = paramStore.getState().products.allMenProducts;
            paramStore.dispatch(displayProductCategory(setProductCategory));
            break;
        case "men bottom":
            paramStore.dispatch(listMensBottoms(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            setProductCategory = paramStore.getState().products.mensBottom;
            paramStore.dispatch(displayProductCategory(setProductCategory));
            break;
        case "men top":
            paramStore.dispatch(listMensTop(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            setProductCategory = paramStore.getState().products.mensTop;
            paramStore.dispatch(displayProductCategory(setProductCategory));
            break;
        case "women all":
            paramStore.dispatch(listOfAllWomenProducts(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            setProductCategory = paramStore.getState().products.allWomenProducts;
            paramStore.dispatch(displayProductCategory(setProductCategory));
            break;
        case "women bottom":
            paramStore.dispatch(listWomensBottoms(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            setProductCategory = paramStore.getState().products.womensBottom;
            paramStore.dispatch(displayProductCategory(setProductCategory));
            break;
        case "women top":
            paramStore.dispatch(listWomensTop(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            setProductCategory = paramStore.getState().products.womensTop;
            paramStore.dispatch(displayProductCategory(setProductCategory));
            break;
        default:
            setProductCategory = null;
            symbolHolder = "";
            break;
    }
    return {
        keyPagePath: pagePath.replace(/\s/, "_"),
        productCategory: setProductCategory,
        symbolHolder
    };
}


export const finalSubCatListing = (dispatch, pagePath, subCategoriesObj) => {
    switch (pagePath) {
        case "men all":
            dispatch(displayProductCategory(subCategoriesObj.ma));
            break;
        case "men bottom":
            dispatch(displayProductCategory(subCategoriesObj.mb));
            break;
        case "men top":
            dispatch(displayProductCategory(subCategoriesObj.mt));
            break;
        case "women all":
            dispatch(displayProductCategory(subCategoriesObj.wa));
            break;
        case "women bottom":
            dispatch(displayProductCategory(subCategoriesObj.wb));
            break;
        case "women top":
            dispatch(displayProductCategory(subCategoriesObj.wt));
            break;
        default:
            setProductCategory(null);
            symbolHolder = "";
            break;
    }
}