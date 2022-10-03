"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchGnd = exports.prepareSearchGnd = void 0;
var axios_1 = require("axios");
var _ = require("lodash");
var LobidQueryBuilder_1 = require("./LobidQueryBuilder");
/**
 * Prepare the query URI
 * @param query Query string passed in by the user
 * @param queryOptions Optional additional query options
 */
function prepareSearchGnd(query, queryOptions) {
    if (queryOptions === void 0) { queryOptions = {}; }
    var userQueryOptions = {
        query: query,
    };
    userQueryOptions = _.merge(userQueryOptions, queryOptions);
    return LobidQueryBuilder_1.buildLobidGndQuery(userQueryOptions);
}
exports.prepareSearchGnd = prepareSearchGnd;
/**
 *
 * @param query Query string passed in by the user
 * @param queryOptions Optional additional query options
 */
function searchGnd(query, queryOptions) {
    if (queryOptions === void 0) { queryOptions = {}; }
    var queryUri = prepareSearchGnd(query, queryOptions);
    return axios_1.default.get(queryUri)
        .then(function (response) {
        var data = response.data;
        return data;
    });
}
exports.searchGnd = searchGnd;
exports.default = searchGnd;
//# sourceMappingURL=LobidClient.js.map