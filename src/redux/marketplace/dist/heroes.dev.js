"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectedHero = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _heroAction = require("./heroAction");

var initHeroState = {
  listHero: [],
  heroSelector: -1,
  limit: 12,
  skip: 0
};
var heroSlices = (0, _toolkit.createSlice)({
  name: 'heroSlices',
  initialState: initHeroState,
  reducers: {
    selectedHero: function selectedHero(state, _ref) {
      var payload = _ref.payload;
      state.heroSelector = payload.heroIndex;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(_heroAction.loadHeroMarketplace.fulfilled, function (state, _ref2) {
      var payload = _ref2.payload;
      state.listHero = payload.data;
      state.limit = payload.limit;
      state.skip = payload.skip;
    });
  }
});
var selectedHero = heroSlices.actions.selectedHero;
exports.selectedHero = selectedHero;
var _default = heroSlices.reducer;
exports.default = _default;