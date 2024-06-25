import axios from 'axios';
import { expect, test, beforeAll } from '@jest/globals';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});


let token: string;
let id: string;

const getOptions = () => ({
    headers: {
        Authorization: 'Bearer ' + token
    }
});

const sample = {
    brand: 'Toyota',
    title: 'Corolla',
    year: 2020,
    price: 7000,
};

beforeAll(async () => {
    const res = await api.post('/auth', {
        name: 'test',
        password: 'test',
    });
    token = res.data.token;
});

test('Create new car', async () => {
    const res = await api.put('/cars', sample, getOptions());
    expect(res.status).toBe(200);
    expect(res.data.ok).toBe('Created');
    expect(res.data._id).toBeTruthy();
    id = res.data._id;
});

test('Edit a car', async () => {
    const res = await api.post(`/cars/${id}`, { price: 10000 }, getOptions());
    expect(res.status).toBe(200);
    expect(res.data.ok).toBe('Updated');
});

test('Get a car', async () => {
    const res = await api.get(`/cars/${id}`, getOptions());
    expect(res.status).toBe(200);
    expect(res.data.brand).toBe(sample.brand);
});

test('List cars', async () => {
    const res = await api.get(`/cars?brand=${sample.brand}`, getOptions());
    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThanOrEqual(1);
});

test('Delete a car', async () => {
    const res = await api.delete(`/cars/${id}`, getOptions());
    expect(res.status).toBe(200);
    expect(res.data.ok).toBe('Deleted');
});
