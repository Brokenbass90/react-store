import React, {useState, useEffect} from "react";
import {API_KEY, API_URL} from '../config';

import {Preloader} from '../components/Preloader';
import {GoodsList} from '../components/GoodsList';
import {Cart} from '../components/Cart';
import {BasketList} from '../components/BasketList';
import {Alert} from '../components/Alert';

function Main() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBaskedShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    useEffect(function getGoods(){
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            },
        }).then(response => response.json()).then(data => {
            data.featured && setGoods(data.featured);
            setLoading(false);
        })
    }, [])

    const handleBaskedShow = () => {
        setBaskedShow(!isBasketShow);
    }

    const closeAlert = () => {
        setAlertName('');
    }

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);

        if(itemIndex < 0){
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity:orderItem.quantity +1,
                    }
                } else {
                    return orderItem;
                }
            })

            setOrder(newOrder);
        } 
        setAlertName(item.name);
    }

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder);
    }

    const incQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                }
            } else {
                return el;
            }
        })
        setOrder(newOrder);
    }

    const decQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                }
            } else {
                return el;
            }
        })
        setOrder(newOrder);
    }

    return (
        <main className='container content'>
            <Cart quantity={order.length} handleBaskedShow={handleBaskedShow} />
            {
                loading ? (
                    <Preloader />
                    ) : ( 
                        <GoodsList goods={goods} addToBasket={addToBasket}/>
                    )}
            {isBasketShow && (<BasketList order={order} 
                    handleBaskedShow={handleBaskedShow} 
                    removeFromBasket={removeFromBasket}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
                )}    
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert}/>
            }    
        </main>

    )
};

export {Main};

