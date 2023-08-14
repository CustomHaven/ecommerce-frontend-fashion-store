import { listOfAllMenProducts, listMensBottoms, listMensTop,
    listOfAllWomenProducts, listWomensBottoms, listWomensTop,
    displayProductCategory } from "../feature/productSlice/productSlice";

export const productCategoriesSeparator = (paramStore, allProducts, pagePath, productCategory, symbolHolder) => {
    symbolHolder = pagePath.replace(/^(\w).+(\b\w).+/g, "$1$2").toLowerCase();
    if (!allProducts) {
        console.log("pagePath", pagePath.replace(/^(\w).+(\b\w).+/g, "$1$2"));
        
        productCategory = []
        return {
            productCategory,
            symbolHolder
        };
    }

    switch (pagePath) {
        case "men all":
            paramStore.dispatch(listOfAllMenProducts(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            productCategory = paramStore.getState().products.allMenProducts;
            paramStore.dispatch(displayProductCategory(productCategory));
            break;
        case "men bottom":
            paramStore.dispatch(listMensBottoms(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            productCategory = paramStore.getState().products.mensBottom;
            paramStore.dispatch(displayProductCategory(productCategory));
            break;
        case "men top":
            paramStore.dispatch(listMensTop(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            productCategory = paramStore.getState().products.mensTop;
            paramStore.dispatch(displayProductCategory(productCategory));
            break;
        case "women all":
            paramStore.dispatch(listOfAllWomenProducts(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            productCategory = paramStore.getState().products.allWomenProducts;
            paramStore.dispatch(displayProductCategory(productCategory));
            break;
        case "women bottom":
            paramStore.dispatch(listWomensBottoms(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            productCategory = paramStore.getState().products.womensBottom;
            paramStore.dispatch(displayProductCategory(productCategory));
            break;
        case "women top":
            paramStore.dispatch(listWomensTop(typeof allProducts === "object" ? allProducts : JSON.parse(allProducts)));
            productCategory = paramStore.getState().products.womensTop;
            paramStore.dispatch(displayProductCategory(productCategory));
            break;
        default:
            productCategory = null;
            symbolHolder = "";
            break;
    }
    return {
        productCategory,
        symbolHolder
    };
}