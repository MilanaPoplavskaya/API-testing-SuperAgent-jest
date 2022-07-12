import superagent from "superagent";
import {expectedObjPost} from "./objects";
import {expectedObjGet} from "./objects";
const URL: string = "https://reqres.in/api/users";

describe("HTTP requests", () => {
    test("Check http request: post: status", async () => {
        let response: any = await superagent.post(URL);
        expect(response.status).toBe(201);
    });
    test("Check http request: post: set + send, check name", async () => {
        let response: any = await superagent.post(URL).set("Content-Type", "application/json").send({
            name: "Milana",
        });
        expect(response.body.name).toEqual(expectedObjPost.name);
    });
    test("Check http request: post: set + send, check role", async () => {
        let response: any = await superagent.post(URL).set("Content-Type", "application/json").send({
            role: "Student",
        });
        expect(response.body.role).toEqual(expectedObjPost.role);
    });
    test("Check http request: get: status", async () => {
        let response: any;
        try {
            response = await superagent.get(URL);
        } catch (err: any) {
            console.log(err.message);
            console.log(response);
        }

        expect(response.status).toBe(200)
    });
    test("Check http request: get + query", async () => {
        const response = await superagent.get(URL).query({id: 1});
        expect(response.body.data).toEqual(expectedObjGet);
    });
    test("Check http request: get: ok", async () => {
        const response = await superagent.get(URL);
        expect(response.ok).toBe(true);
    });
    test("Check http request: get: type", async () => {
        const response = await superagent.get(URL);
        expect(response.type).toBe("application/json");
    });
    test("Check http request: delete: status", async () => {
        const response = await superagent.delete(URL);
        expect(response.status).toBe(204);
    });
    test("Check http request: delete: clientError", async () => {
        const response = await superagent.delete(URL);
        expect(response.clientError).toBe(false);
    });
    test("Check http request: head: charset", async () => {
        const response = await superagent.head(URL);
        expect(response.charset).toBe("utf-8");
    });

});
