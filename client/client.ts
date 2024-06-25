import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

async function main() {
    let res = await api.post('/auth', {
        name: 'test',
        password: 'test',
    });

    console.log(res.data);

    const { token } = res.data;
    const opts = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
/*
    res = await api.put('/cars', {
        brand: 'Toyota',
        title: 'Corolla',
        year: 2020,
        price: 7000,
    }, opts);
    console.log(res.data);
*/

    res = await api.post('/cars/667887770960f188dfada8ff', { price: 10000 }, opts);
    console.log(res.data);

    res = await api.get('/cars', opts);
    console.log(res.data);

    res = await api.get('/cars/667887770960f188dfada800', opts);
    console.log(res.data);

}

main();
