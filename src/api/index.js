import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTAyOTIxMjEsIkFwcGxpY2F0aW9uIjoiUnVrb3ZvZGl0ZWwifQ.tdUIEg-hrhP2dRQHL1r6x3raC2GZ8qu0utwrTC8zUBk";

const instance = axios.create({
    baseURL: `https://portal.liloo.by/api/services/store`,
    headers: {
        Authorization : `Bearer ${token}`,
    },
});

instance.interceptors.response.use(
    (response) => response.data,
    (error) => alert(error),
);

export const getAllProduct = async () => {
    const response = await instance.get("/all_product_positions");
    return response;
};

export const GETdata = (params) => {
    // console.log(params);
};