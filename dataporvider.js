const data = {
    getList: (resource , params , URL) => {
        if(params == null){
            params = {};
        }
        let URL = `${URL}/${resource}`;

        return fetch(URL).then(({ headers , json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }))
    }
}