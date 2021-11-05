function BasketItem(props) {

    const {
        id,
        name,
        price,
        quantity,
        removeFromBasket=Function.prototype,
        incQuantity=Function.prototype,
        decQuantity=Function.prototype,
     } = props;
    return (
        <li className="collection-item">
            {name} x {quantity} = {price * quantity} Руб.
            <button className="basket-buttons" onClick={() => decQuantity(id)}>-</button>
            <button className="basket-buttons" onClick={() => incQuantity(id)}>+</button>
            <span class="secondary-content" onClick={() => removeFromBasket(id)}>
                <i class="material-icons basket-delete" >clear</i></span>
        </li>
    )

}

export {BasketItem};