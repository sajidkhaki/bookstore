import { API } from '../Config'

import queryString from "query-string"

/*Backend router.get('/products', list)*/
export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
        .then(response => {
            //console.log("Response", response)
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}


/*getting filtered from checkbox*/
export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }
    return fetch(`${API}/products/by/search/`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            // console.log("Response", response)
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}

/*Getting Products based on search parameters*/

export const list = (params) => {
    const query = queryString.stringify(params)
    console.log("Query", query)
    return fetch(`${API}/products/search?${query}`, {
        method: "GET",
    })
        .then(response => {
            console.log("Response from query", response)
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
        .then(response => {
            //console.log("Response", response)
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}


export const getBraintreeToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            'x-access-token': token,
        },
    })
        .then(response => {
            //console.log("Response", response)
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}

export const processPayment = (userId, token, paymentData) => {

    console.log("++++++++Payment Data+++++++++++")
    console.log(paymentData)
    console.log("++++++++Payment Data+++++++++++")
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            'x-access-token': token,
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {

    console.log("create order data")
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            'x-access-token': token,
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
