export default class StrapiClient {
    constructor() {}
    async fetchData (path){
        const requestURL = `${process.env.STRAPI_API_URL}${path}`;
        const response = await fetch (requestURL);
        const data = await response.json();
        return data;
    }
}