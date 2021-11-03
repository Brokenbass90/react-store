function Cart(props){
    const {quantity = 0, handleBaskedShow = Function.prototype} = props;

    return <div className="cart deep-purple darken-3 white-text" onClick={handleBaskedShow}>
        <i className="material-icons">local_grocery_store</i>
        {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
}

export {Cart};