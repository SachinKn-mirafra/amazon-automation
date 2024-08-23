const {test, expect} = require('@playwright/test');

const baseURL = 'https://reqres.in';

let userId;

test('Get User @ID-004', async ({request}) => {
    const response = await request.get(baseURL + '/api/users?page=2');

    expect(response.status()).toBe(200);

    const jsonResponse = await response.json();

    console.log(jsonResponse);

    expect(jsonResponse.data[0].id).toBe(7);
    expect(jsonResponse.data[0].email).toBe('michael.lawson@reqres.in');

});

test('Create User @ID-005', async ({request}) => {

    const response = await request.post(baseURL + '/api/users', {
        data: {
            "name": "Sachin Kn",
            "job": "Tester"
        },
        headers: {
            'accept': 'application/json'
        }
    });

    expect(response.status()).toBe(201);

    const jsonResponse = await response.json();

    console.log(jsonResponse);

    expect(jsonResponse.name).toBe('Sachin Kn');
    expect(jsonResponse.job).toBe('Tester');

    userId = jsonResponse.id;

});

test('Update User @ID-006', async ({request}) => {

    const response = await request.put(baseURL + '/api/users/' + userId, {
        data: {
            "name": "Sachin Kn",
            "job": "Developer"
        },
        headers: {
            'accept': 'application/json'
        }
    });

    expect(response.status()).toBe(200);

    const jsonResponse = await response.json();

    console.log(jsonResponse);

    expect(jsonResponse.name).toBe('Sachin Kn');
    expect(jsonResponse.job).toBe('Developer');

});

test('Delete User', async ({request}) => {
    const response = await request.delete(baseURL + '/api/users/' + userId);
    expect(response.status()).toBe(204);
});

