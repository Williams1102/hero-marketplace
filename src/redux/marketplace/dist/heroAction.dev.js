"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadHeroMarketplace = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _heroMarketNFT = require("services/contracts/heroMarketNFT");

var loadHeroMarketplace = (0, _toolkit.createAsyncThunk)('loadHeroMarketplace', function _callee(_ref, _ref2) {
  var limit, skip, dispatch, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          limit = _ref.limit, skip = _ref.skip;
          dispatch = _ref2.dispatch;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _heroMarketNFT.getInfoMarketplace)({
            limit: limit,
            skip: skip
          }));

        case 5:
          res = _context.sent;

          if (!res.success) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", {
            data: res.data,
            limit: limit,
            skip: skip
          });

        case 8:
          return _context.abrupt("return", {
            data: [],
            limit: limit,
            skip: skip
          });

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          console.log('🚀 ~ file: heroAction.js ~ line 21 ~ e', _context.t0.message);
          return _context.abrupt("return", {
            data: [],
            limit: limit,
            skip: skip
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
});
exports.loadHeroMarketplace = loadHeroMarketplace;