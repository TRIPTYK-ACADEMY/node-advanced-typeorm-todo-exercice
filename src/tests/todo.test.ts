import supertest from 'supertest';
import { initApp } from '../server';

test('FindById must return object and 200 OK', async () => {
    const api = supertest(await initApp());

    await api.get('api/v1/todos/1')
        .then((res) => {
            expect(res.status).toStrictEqual(200);
            expect(typeof res.body.todos).toStrictEqual('object');
        });

    await api.get('api/v1/todos/').then((res) => {
        expect(res.status).toStrictEqual(200);
        expect(Array.isArray(res.body.todos)).toBeTruthy();
    });
});