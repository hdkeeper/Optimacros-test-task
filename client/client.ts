import minimist, { ParsedArgs } from 'minimist';
import axios, { AxiosError } from 'axios';
import '@types/node';


const api = axios.create({
    baseURL: 'http://localhost:3000'
});


async function handleAction(args: ParsedArgs) {
    try {
        let res = await api.post('/auth', {
            name: args.u,
            password: args.p,
        });
    
        const { token } = res.data;
        const queryOpts = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
    
        const [action, a1, a2] = args._;
        switch (action) {
            case 'list': {
                res = await api.get(`/cars${a1 ? `?brand=${a1}` : ''}`, queryOpts);
                break;
            }
            case 'get': {
                res = await api.get(`/cars/${a1}`, queryOpts);
                break;
            }
            case 'create': {
                res = await api.put(`/cars`, JSON.parse(a1), queryOpts);
                break;
            }
            case 'edit': {
                res = await api.post(`/cars/${a1}`, JSON.parse(a2), queryOpts);
                break;
            }
            case 'delete': {
                res = await api.delete(`/cars/${a1}`, queryOpts);
                break;
            }
            default: {
                console.error(`Unknown action ${action}`);
                return;
            }
        }
    
        console.log(res.data);
    }
    catch (ex) {
        if (ex instanceof AxiosError) {
            console.error((ex as AxiosError).response?.data);
        } else {
            console.error(ex);
        }
    }
}

handleAction(minimist(process.argv.slice(2)));
