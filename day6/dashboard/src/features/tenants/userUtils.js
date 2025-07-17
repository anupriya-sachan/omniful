import { getInventoryById } from "./inventorySlice";
import { getUserById } from "./userSlice";

export const getInventoryByUserId = (state,userId) => {
    const user = getUserById(state,userId);
    const inventoryId = user.inv;
    const inventory = getInventoryById(state,inventoryId);
    return inventory.items;
}

export const getProductTitleAndPrice = (state, productId) => {
        const product = getProductById(state, productId);
        return {
            title: product?.title,
            price: product?.price,
        };
    };
