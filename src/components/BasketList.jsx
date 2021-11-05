import {BasketItem} from '../components/BasketItem';

function BasketList(props) {
    const {order = [], 
        handleBaskedShow = Function.prototype, 
        removeFromBasket=Function.prototype,
        incQuantity=Function.prototype,
        decQuantity=Function.prototype,
    } = props;

    const totalPrice = order.reduce((sum, elem) => {
        return sum + elem.price * elem.quantity
    }, 0);
    return (
        <ul className="collection basket-list">
            <i className="material-icons basket-close" onClick={handleBaskedShow}>clear</i>
            <li className="collection-item active">Корзина</li>
            {
                order.length ? order.map(item => (
                    <BasketItem key={item.id} 
                        removeFromBasket={removeFromBasket}  
                        incQuantity={incQuantity}
                        decQuantity={decQuantity} 
                        {...item}
                    />
                )) : (
                    <li className="collection-item">Корзина пуста</li>
                )}

            <li className="collection-item active">Общая стоимость: {totalPrice} Руб.</li>
      </ul>
      
    )
}

export {BasketList};