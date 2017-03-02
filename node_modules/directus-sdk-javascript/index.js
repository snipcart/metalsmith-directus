module.exports = function(e) {
    function t(i) {
        if (r[i]) return r[i].exports;
        var a = r[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports;
    }
    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0);
}([ function(e, t, r) {
    e.exports = r(1);
}, function(e, t, r) {
    "use strict";
    function i(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1.1;
        if (!e) throw new Error("No access token provided");
        if (!t) throw new Error("No Directus URL provided");
        this.accessToken = e, this.url = t, this.apiVersion = i, this.baseEndpoint = this.url + "/" + this.apiVersion + "/", 
        this.endpoints = r(2), Object.assign(this, r(3));
    }
    e.exports = i;
}, function(e, t) {
    "use strict";
    e.exports = {
        tableEntries: "tables/%s/rows",
        tableEntry: "tables/%s/rows/%s",
        tableList: "tables",
        tableInformation: "tables/%s",
        tablePreferences: "tables/%s/preferences",
        columnList: "tables/%s/columns",
        columnInformation: "tables/%s/columns/%s",
        groupList: "groups",
        groupInformation: "groups/%s",
        groupPrivileges: "privileges/%s",
        tablePrivileges: "privileges/%s/%s",
        fileList: "files",
        fileInformation: "files/%s",
        settingList: "settings",
        settingCollection: "settings/%s",
        messageList: "messages/rows",
        messageInformation: "messages/rows/%s",
        activity: "activity",
        bookmarkList: "bookmarks",
        bookmarkSelf: "bookmarks/self",
        bookmarkInformation: "bookmarks/%s",
        settings: "settings",
        settingsType: "settings/%s"
    };
}, function(e, t, r) {
    "use strict";
    var i = r(4), a = i.buildPath, o = i.performRequest, s = r(8), n = s.createItem, l = s.getItems, c = s.getItem, u = s.updateItem, d = s.deleteItem, p = r(10), f = p.createFile, m = p.getFiles, b = p.getFile, T = p.updateFile, h = r(11), k = h.getTables, v = h.getTable, g = h.createTable, O = r(12), N = O.createColumn, R = O.getColumns, I = O.getColumn, q = O.updateColumn, C = O.deleteColumn, E = r(13), y = E.createPrivilege, F = E.getGroupPrivilege, B = E.getTablePrivilege, P = E.updatePrivilege, U = r(14), G = U.getPreference, S = U.updatePreference, j = r(15), x = j.getMessages, J = j.getMessage, L = r(16), w = L.getActivity, V = r(17), _ = V.getBookmarks, D = V.getUserBookmarks, A = V.getBookmark, M = V.createBookmark, z = V.deleteBookmark, H = r(18), Y = H.getSettings, K = H.getSettingsByCollection, Q = H.updateSettings;
    e.exports = {
        buildPath: a,
        performRequest: o,
        createItem: n,
        getItems: l,
        getItem: c,
        updateItem: u,
        deleteItem: d,
        createFile: f,
        getFiles: m,
        getFile: b,
        updateFile: T,
        getTables: k,
        getTable: v,
        createTable: g,
        createColumn: N,
        getColumns: R,
        getColumn: I,
        updateColumn: q,
        deleteColumn: C,
        createPrivilege: y,
        getGroupPrivilege: F,
        getTablePrivilege: B,
        updatePrivilege: P,
        getPreference: G,
        updatePreference: S,
        getMessages: x,
        getMessage: J,
        getActivity: w,
        getBookmarks: _,
        getUserBookmarks: D,
        getBookmark: A,
        createBookmark: M,
        deleteBookmark: z,
        getSettings: Y,
        getSettingsByCollection: K,
        updateSettings: Q
    };
}, function(e, t, r) {
    "use strict";
    var i = r(5).vsprintf, a = r(6), o = r(7);
    e.exports = {
        buildPath: function(e, t) {
            return i(e, t);
        },
        performRequest: function() {
            var e = o([ {
                method: o.STRING | o.Required
            }, {
                pathFormat: o.STRING | o.Required
            }, {
                variables: o.ARRAY | o.Optional,
                _default: []
            }, {
                paramsOrBody: o.OBJECT | o.Optional,
                _default: {}
            }, {
                callback: o.FUNCTION | o.Required
            } ], arguments), t = e.pathFormat.indexOf("%s") === -1 ? this.baseEndpoint + e.pathFormat : this.baseEndpoint + this.buildPath(e.pathFormat, e.variables), r = function(r, i, a) {
                if (r) throw new Error(r);
                r || 200 != i.statusCode ? 500 == i.statusCode ? e.callback(t + " returned internal server error (500)") : 404 == i.statusCode ? e.callback(t + " returned not found (404)") : 403 == i.statusCode ? e.callback(t + " returned not authorized (403)") : 401 == i.statusCode && e.callback(t + " returned not authorized (401)") : e.callback(null, JSON.parse(a));
            };
            switch (e.method) {
              case "GET":
                a.get({
                    auth: {
                        bearer: this.accessToken
                    },
                    qs: e.paramsOrBody,
                    url: t
                }, r);
                break;

              case "POST":
                a.post({
                    auth: {
                        bearer: this.accessToken
                    },
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(e.paramsOrBody),
                    url: t
                }, r);
                break;

              case "PATCH":
                a.patch({
                    auth: {
                        bearer: this.accessToken
                    },
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(e.paramsOrBody),
                    url: t
                }, r);
                break;

              case "PUT":
                a.put({
                    auth: {
                        bearer: this.accessToken
                    },
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(e.paramsOrBody),
                    url: t
                }, r);
                break;

              case "DELETE":
                a.delete({
                    auth: {
                        bearer: this.accessToken
                    },
                    url: t
                }, r);
            }
        }
    };
}, function(e, t) {
    e.exports = require("sprintf-js");
}, function(e, t) {
    e.exports = require("request");
}, function(e, t) {
    e.exports = require("args-js");
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        createItem: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("POST", this.endpoints.tableEntries, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getItems: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("GET", this.endpoints.tableEntries, r, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getItem: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                id: i.INT | i.Required
            }, {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table, e.id ];
            return this.performRequest("GET", this.endpoints.tableEntry, r, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updateItem: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                id: i.INT | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table, e.id ];
            return this.performRequest("PUT", this.endpoints.tableEntry, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        deleteItem: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                id: i.INT | i.Required
            }, {
                deleteFromDB: i.BOOL | i.Optional,
                _default: !1
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table, e.id ];
            return e.deleteFromDB ? this.performRequest("DELETE", this.endpoints.tableEntry, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }) : this.performRequest("PUT", this.endpoints.tableEntry, r, {
                active: 0
            }, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t) {
    e.exports = require("q");
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        createFile: function() {
            var e = i([ {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("POST", this.endpoints.fileList, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getFiles: function() {
            var e = i([ {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.fileList, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getFile: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("GET", this.endpoints.fileInformation, r, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updateFile: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments);
            this.updateItem("directus_files", e.id, e.data, e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        createTable: function() {
            if (this.apiVersion < 1.1) throw Error("This method can't be used with api version " + this.apiVersion + " use version ^1.1 instead");
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("POST", this.endpoints.tableList, {
                name: e.table
            }, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getTables: function() {
            var e = i([ {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.tableList, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getTable: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("GET", this.endpoints.tableInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        createColumn: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("POST", this.endpoints.columnList, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getColumns: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("GET", this.endpoints.columnList, r, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getColumn: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                column: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table, e.column ];
            return this.performRequest("GET", this.endpoints.columnInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updateColumn: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                column: i.STRING | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table, e.column ];
            return this.performRequest("PUT", this.endpoints.columnInformation, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        deleteColumn: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                column: i.STRING | i.Required
            }, {
                deleteFromDB: i.BOOL | i.Optional,
                _default: !1
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table, e.column ];
            return this.performRequest("DELETE", this.endpoints.columnInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        createPrivileges: function() {
            var e = i([ {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("POST", this.endpoints.groupPrivileges, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getGroupPrivileges: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("GET", this.endpoints.groupPrivileges, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getTablePrivileges: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                table: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id, e.table ];
            return this.performRequest("GET", this.endpoints.tablePrivileges, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updatePrivileges: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                privId: i.INT | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id, e.privId ];
            return this.performRequest("PUT", this.endpoints.tablePrivileges, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getPreferences: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("GET", this.endpoints.tablePreferences, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updatePreferences: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("PUT", this.endpoints.tablePreferences, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getMessages: function() {
            var e = i([ {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.messageList, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getMessage: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("GET", this.endpoints.messageInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getActivity: function() {
            if (this.apiVersion < 1.1) throw Error("This method can't be used with api version " + this.apiVersion + " use version ^1.1 instead");
            var e = i([ {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.activity, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getBookmarks: function() {
            var e = i([ {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.bookmarkList, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getUserBookmarks: function() {
            if (this.apiVersion < 1.1) throw Error("This method can't be used with api version " + this.apiVersion + " use version ^1.1 instead");
            var e = i([ {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.bookmarkSelf, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getBookmark: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("GET", this.endpoints.bookmarkInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        createBookmark: function() {
            if (this.apiVersion < 1.1) throw Error("This method can't be used with api version " + this.apiVersion + " use version ^1.1 instead");
            var e = i([ {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("POST", this.endpoints.bookmarkList, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        deleteBookmark: function() {
            if (this.apiVersion < 1.1) throw Error("This method can't be used with api version " + this.apiVersion + " use version ^1.1 instead");
            var e = i([ {
                id: i.INT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("DELETE", this.endpoints.bookmarkInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getSettings: function() {
            var e = i([ {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.settings, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getSettingsByCollection: function() {
            var e = i([ {
                collection: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.collection ];
            return this.performRequest("GET", this.endpoints.settingsType, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updateSettings: function() {
            var e = i([ {
                collection: i.STRING | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.collection ];
            return this.performRequest("PUT", this.endpoints.settingsType, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
} ]);