export const postFetch = (url, data, token) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the JWT token to the headers
        },
        body: JSON.stringify(data),
    });
};

export const getFetch = (url, token) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the JWT token to the headers
        },
    });
};

export const putFetch = (url, data, token) => {
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the JWT token to the headers
        },
        body: JSON.stringify(data),
    });
};

export const deleteFetch = (url, token) => {
    return fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the JWT token to the headers
        },
    });
};
