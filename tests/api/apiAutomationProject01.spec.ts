import { expect, test } from "../../fixtures/test-data-fixtures";
import runQuery from "../../helpers/dbUtils";

test.describe.configure({ mode: 'serial' });

test.describe('TechGlobal Students API', () => {

    let studentID;

    test('GET all students', async ({ request }) => {
        
        const response = await request.get(process.env.API_ENDPOINT!);


        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        // console.log(responseBody);

        expect(responseBody.length).toEqual(2);

        responseBody.forEach(student => {
            expect(student).toHaveProperty('STUDENT_ID');
        });
    });

    test('Create a new student', async ({ request, newStudent }) => {

        const response = await request.post(process.env.API_ENDPOINT!, {
            data: newStudent
        });

        expect(response.status()).toBe(201);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        // console.log(responseBody);

        studentID = responseBody.STUDENT_ID;

        for (const key in responseBody) {
            expect(studentID).toBeGreaterThan(2);
            expect(responseBody.DOB).toBe(newStudent.DOB);
            expect(responseBody.EMAIL).toBe(newStudent.EMAIL);
            expect(responseBody.FIRST_NAME).toBe(newStudent.FIRST_NAME);
            expect(responseBody.LAST_NAME).toBe(newStudent.LAST_NAME);
            expect(responseBody.INSTRUCTOR_ID).toBe(newStudent.INSTRUCTOR_ID);
        };
    });

    test('GET newly created student', async ({ request, newStudent }) => {

        const response = await request.get(process.env.API_ENDPOINT! + `/${studentID}`);

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        // console.log(responseBody.DOB);

        for (const key in responseBody) {
            if (key === 'DOB') {
                const receivedString = responseBody[key].split('T')[0];
                expect(receivedString).toBe(newStudent[key]);
            }
            expect(responseBody.STUDENT_ID).toBe(studentID);
            expect(responseBody.EMAIL).toBe(newStudent.EMAIL);
            expect(responseBody.FIRST_NAME).toBe(newStudent.FIRST_NAME);
            expect(responseBody.LAST_NAME).toBe(newStudent.LAST_NAME);
            expect(responseBody.INSTRUCTOR_ID).toBe(newStudent.INSTRUCTOR_ID);
        };
    });

    test('Update (PUT) newly created student with a different instructor', async ({ request, updatedStudentForProjectAPI }) => {

        const response = await request.put(process.env.API_ENDPOINT! + `/${studentID}`, {
            data: updatedStudentForProjectAPI
        });

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        expect(responseBody.message).toBe(`Successfully updated the student with the STUDENT_ID: ${studentID}`);
    });

    test('DELETE newly created student', async ({ request, updatedStudentForProjectAPI }) => {
        
        const response = await request.delete(process.env.API_ENDPOINT! + `/${studentID}`);

        expect(response.status()).toBe(204);
        expect(response.ok()).toBeTruthy();

        const query = `SELECT * FROM students WHERE email = '${updatedStudentForProjectAPI.EMAIL}'`;
        const result = await runQuery(query);

        expect(result.length).toBe(0);
    });
});