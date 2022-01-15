import { Products } from "./products.model";

export class ShoppingList {
    id: string;
    name: string;
    users: [string];
    products: [Products];
}
