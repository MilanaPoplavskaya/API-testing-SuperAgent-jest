import superagent from "superagent";
import {expectedObjPost} from "./objects";
import {expectedObjGet} from "./objects";

describe("HTTP requests", () => {
    test("Check http request: post: status", async () => {
        let response: any = await superagent.post("https://reqres.in/api/users");
        expect(response.status).toBe(201);
    });
    test("Check http request: post: set + send, check name", async () => {
        let response: any = await superagent.post("https://reqres.in/api/users").set("Content-Type", "application/json").send({
            name: "Milana",
        });
        expect(response.body.name).toEqual(expectedObjPost.name);
    });
    test("Check http request: post: set + send, check role", async () => {
        let response: any = await superagent.post("https://reqres.in/api/users").set("Content-Type", "application/json").send({
            role: "Student",
        });
        expect(response.body.role).toEqual(expectedObjPost.role);
    });
    test("Check http request: get: status", async () => {
        let response: any;
        try {
            response = await superagent.get("https://reqres.in/api/users");
        } catch (err: any) {
            console.log(err.message);
            console.log(response);
        }

        expect(response.status).toBe(200)
    });
    test("Check http request: get + query", async () => {
        const response = await superagent.get("https://reqres.in/api/users").query({id: 1});
        expect(response.body.data).toEqual(expectedObjGet);
    });
    test("Check http request: get: ok", async () => {
        const response = await superagent.get("https://reqres.in/api/users");
        expect(response.ok).toBe(true);
    });
    test("Check http request: get: type", async () => {
        const response = await superagent.get("https://reqres.in/api/users");
        expect(response.type).toBe("application/json");
    });
    test("Check http request: delete: status", async () => {
        const response = await superagent.delete("https://reqres.in/api/users");
        expect(response.status).toBe(204);
    });
    test("Check http request: delete: clientError", async () => {
        const response = await superagent.delete("https://reqres.in/api/users");
        expect(response.clientError).toBe(false);
    });
    test("Check http request: head: charset", async () => {
        const response = await superagent.head("https://reqres.in/api/users");
        expect(response.charset).toBe("utf-8");
    });

});
