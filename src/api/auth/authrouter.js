module.exports = function(router){

    const authenticate = require("./auth");
    const authorizeWithRole = require("./authorization");


    function defineRoute(method, path, callback) {
        router[method.toLowerCase()](path, callback);
    }

    function defineAuthRoute(method, path, callback) {
        router[method.toLowerCase()](path, authenticate, callback);
    }

    function defineAuthRouteWithRoles(method, path, roles, callback) {
        router[method.toLowerCase()](path, authenticate, authorizeWithRole(roles), callback);
    }

    function AuthRouter() {
        return {
            define: () => {
                return new Router();
            },
            getRouter: () => {
                return router;
            }
        }
    }

    function Router(path = "/") {
        this.withAuthentication = false;
        this.withAuthorization = false;
        this.roles = [];
        this.withPath = path;

        this.path = (path) => {
            this.withPath = path;
            return this;
        };

        this.get = (callback) => {
            return this.route("GET", callback);
        };

        this.post = (callback) => {
            return this.route("POST", callback);
        };

        this.put = (callback) => {
            return this.route("PUT", callback);
        };

        this.delete = (callback) => {
            return this.route("DELETE", callback);
        };

        this.route = (method, callback) => {
            if (this.withAuthentication) {
                if (this.withAuthorization) {
                    defineAuthRouteWithRoles(method, this.withPath, this.roles, callback)
                }
                defineAuthRoute(method, this.withPath, callback);
            } else {
                defineRoute(method, this.withPath, callback);
            }
            return this;
        };

        this.and = () => {
            return new Router(this.withPath);
        };

        this.needsAuthentication = () => {
            this.withAuthentication = true;
            return this;
        };

        this.withRoles = (roles) => {
            this.withAuthorization = true;
            this.roles = roles;
            return this;
        };

        return {
            get: this.get,
            post: this.post,
            put: this.put,
            delete: this.delete,
            and: this.and,
            needsAuthentication: this.needsAuthentication,
            withRoles: this.withRoles,
            path: this.path
        };
    }

    return new AuthRouter();
};