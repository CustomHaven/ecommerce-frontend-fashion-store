export const handleRemove = (e, data, cartList, setFireOnce, removeCartItemThunk, dispatch, tableRef, index, root, windowWidth) => {
    root.current.style.setProperty("--grow-shrink-ani", ".7s");
    tableRef.current.children[0].children[1].children[index].children[windowWidth > 700 ? 4 : 3].children[0].children[1].children[0].classList.add("grow-shrink");

    setTimeout(() => {
        root.current.style.setProperty("--grow-shrink-ani", ".7s");
        dispatch(removeCartItemThunk({ cartItemId: data.cartItemId }));
        if (cartList.length === 1) {
            setFireOnce(true);
        }
    }, 800);
}

export const handleProductName = (e, data, router) => {
    e.preventDefault();
    const type = data.product.type.replace(/(\w+)\s(\w+)/, (a, b, c, d, e) => b.toLowerCase() + "/" + c.toLowerCase());
    router.push("products/" + type + "/" + data.product.id);
}

export const handleInput = (e, data, updateQuantity, dispatch) => {
    const reg = new RegExp(/^\d*$/)
    if (!reg.test(e.target.value)) {
        return;
    }
    console.log("testing!")
    const numberInput = parseInt(e.target.value);
    let quantity;
    if (numberInput > data.product.quantity) {
        quantity = data.product.quantity;
    } else if (numberInput <= 0) {
        quantity = 1;
    } else {
        quantity = e.target.value;
    }

    const obj = {
        cartItemId: data.cartItemId,
        quantity: quantity
    }

    dispatch(updateQuantity(obj));
}


export const handlePlus = (e, data, updateQuantity, dispatch) => {
    const quantity = data.quantity + 1;
    const obj = {
        cartItemId: data.cartItemId,
        quantity: quantity > data.product.quantity ? data.quantity : quantity
    }

    dispatch(updateQuantity(obj));
}


export const handleMinus = (e, data, updateQuantity, pageType, cartList, removeCartItemThunk, setFireOnce, dispatch) => {
    const quantity = data.quantity - 1;
    const obj = {
        cartItemId: data.cartItemId,
        quantity: quantity <= 0 ? 0 : quantity
    }

    dispatch(updateQuantity(obj));

    if (pageType === "cart") {
        if (quantity === 0) {
            dispatch(removeCartItemThunk({ cartItemId: data.cartItemId }));
        }
    
        if (cartList.length === 0) {
            setFireOnce(true);
        }
    }
}