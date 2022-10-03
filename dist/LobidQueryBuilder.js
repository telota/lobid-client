"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFormat = exports.buildPagination = exports.buildFilters = exports.prepareQueryOptions = exports.validateQueryOptions = exports.buildLobidGndQuery = void 0;
var _ = require("lodash");
var LobidQueryOptions_1 = require("./LobidQueryOptions");
var LobidConstants_1 = require("./LobidConstants");
/**
 * Build the query URI for LOBID
 * @param queryOptions QueryOptions passed in by the user
 */
function buildLobidGndQuery(queryOptions) {
    var lobidQueryUri = LobidConstants_1.lobidGndApi;
    var preparedQueryOptions = prepareQueryOptions(queryOptions);
    // Prepend the preferred field, if specified
    if (preparedQueryOptions.field) {
        lobidQueryUri += queryOptions.field + ":";
    }
    // Append the query string
    lobidQueryUri += preparedQueryOptions.query;
    // Append filters if there are any
    lobidQueryUri += buildFilters(preparedQueryOptions);
    // Append from and size pagination parameters if ther are any
    lobidQueryUri += buildPagination(preparedQueryOptions);
    // Append format
    lobidQueryUri += buildFormat(preparedQueryOptions);
    return lobidQueryUri;
}
exports.buildLobidGndQuery = buildLobidGndQuery;
/**
 * Make sure the query options are valid, i.e. no unallowed field names
 * @param queryOptions Query Options passed in by the user
 */
function validateQueryOptions(queryOptions) {
    var validatedOptions = queryOptions;
    if (_.has(queryOptions, 'format')) {
        if (!_.includes(LobidQueryOptions_1.allowedLobidGndFormats, queryOptions.format)) {
            try {
                throw new TypeError("The return format \"" + queryOptions.format + "\" does not" +
                    ("match any of the allowed formats: " + LobidQueryOptions_1.allowedLobidGndFormats));
            }
            catch (e) {
                validatedOptions.format = 'json';
            }
        }
    }
    return validatedOptions;
}
exports.validateQueryOptions = validateQueryOptions;
/**
 * Insert some default values in case the user did not specify any
 * @param userQueryOptions Query Options passed in by the user
 */
function prepareQueryOptions(userQueryOptions) {
    var preparedOptions = validateQueryOptions(userQueryOptions);
    if (!_.has(userQueryOptions, 'size')) {
        preparedOptions.size = LobidQueryOptions_1.lobidDefaultGndQueryOptions.size;
    }
    if (!_.has(userQueryOptions, 'format')) {
        preparedOptions.format = LobidQueryOptions_1.lobidDefaultGndQueryOptions.format;
    }
    return preparedOptions;
}
exports.prepareQueryOptions = prepareQueryOptions;
/**
 * Chain all filters together
 * @param userQueryOptions Query options passed in by the user
 */
function buildFilters(userQueryOptions) {
    if (!_.has(userQueryOptions, 'filter')) {
        return '';
    }
    var filters = _.keys(userQueryOptions.filter).map(function (filterKey) {
        var value = userQueryOptions.filter[filterKey];
        return filterKey + ":" + value;
    }).join(' AND ');
    return "&filter=" + filters;
}
exports.buildFilters = buildFilters;
/**
 * Build the pagination parameter substring
 * @param userQueryOptions Query options passed in by the user
 */
function buildPagination(userQueryOptions) {
    var pagination = '';
    if (_.has(userQueryOptions, 'from')) {
        pagination += "&from=" + userQueryOptions.from;
    }
    // Size will always be set when querying since it will
    // be inserted by default if not set by the user
    pagination += "&size=" + userQueryOptions.size;
    return pagination;
}
exports.buildPagination = buildPagination;
/**
 * Build the format parameter
 * @param userQueryOptions Query options passed in by the user
 */
function buildFormat(userQueryOptions) {
    var format = "&format=" + userQueryOptions.format;
    if (_.has(userQueryOptions, 'formatFields') && (userQueryOptions.format === 'json')) {
        format += ':';
        format += userQueryOptions.formatFields.join(',');
    }
    return format;
}
exports.buildFormat = buildFormat;
exports.default = buildLobidGndQuery;
//# sourceMappingURL=LobidQueryBuilder.js.map