"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _connectedReactRouter = require("connected-react-router");

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _user = _interopRequireDefault(require("./user/user.reducer"));

var _commonReducer = _interopRequireDefault(require("./common/commonReducer"));

var _heroes = _interopRequireDefault(require("./marketplace/heroes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var persistConfig = {
  key: 'root',
  storage: _storage.default
};

var rootReducer = function rootReducer(history) {
  return (0, _reduxPersist.persistReducer)(persistConfig, (0, _redux.combineReducers)({
    router: (0, _connectedReactRouter.connectRouter)(history),
    user: _user.default,
    common: _commonReducer.default,
    heroSlices: _heroes.default
  }));
};

var _default = rootReducer;
exports.default = _default;