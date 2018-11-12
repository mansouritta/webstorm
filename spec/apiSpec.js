var request = require("request");

describe("API", function() {
    it("returns an empty result on GET /todos", function(done) {
        request("http://localhost:8000/todos", function(error, res, body) {
            expect(JSON.parse(body)).toEqual({todos: []});
            done();
        });
    });
    it("saves and returns the todo on POST /todos", function(done) {
        request({
            method: "POST",
            url: "http://localhost:8000/todos",
            json: {todo: "buy milk"}
        }, function(error, res, body) {
            expect(body).toEqual({todo: 'buy milk'});
            done();
        });
    });
});
