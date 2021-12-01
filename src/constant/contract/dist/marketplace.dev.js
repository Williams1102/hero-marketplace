"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKabyMarketAddress = getKabyMarketAddress;
exports.getKabyMarketABI = void 0;

var _network = require("./network");

var _Marketplace = _interopRequireDefault(require("./abis/Marketplace.json"));

var _MarketplaceMain = _interopRequireDefault(require("./abis/MarketplaceMain.json"));

var _NetWork, _MARKETPLACE_ADDRESS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MAINNET_POLYGON_KABY_MARKET = '';
var TESTNET_POLYGON_KABY_MARKET = '';
var MAINNET_BSC_KABY_MARKET = '';
var TESTNET_BSC_KABY_MARKET = '0xAE655450B4EF8F9d25dB8E29A6f35D6729656Aa9';
var NetWork = (_NetWork = {}, _defineProperty(_NetWork, _network.networkChainId.bscMainnet, _MarketplaceMain.default), _defineProperty(_NetWork, _network.networkChainId.polygonMainnet, _MarketplaceMain.default), _defineProperty(_NetWork, _network.networkChainId.bscTestnet, _Marketplace.default), _defineProperty(_NetWork, _network.networkChainId.polygonTestnet, _Marketplace.default), _NetWork);

var getKabyMarketABI = function getKabyMarketABI(chainId) {
  return {
    MARKETPLACE_ABI: NetWork[chainId]
  };
};

exports.getKabyMarketABI = getKabyMarketABI;
var MARKETPLACE_ADDRESS = (_MARKETPLACE_ADDRESS = {}, _defineProperty(_MARKETPLACE_ADDRESS, _network.networkChainId.polygonTestnet, TESTNET_POLYGON_KABY_MARKET), _defineProperty(_MARKETPLACE_ADDRESS, _network.networkChainId.bscTestnet, TESTNET_BSC_KABY_MARKET), _defineProperty(_MARKETPLACE_ADDRESS, _network.networkChainId.polygonMainnet, MAINNET_POLYGON_KABY_MARKET), _defineProperty(_MARKETPLACE_ADDRESS, _network.networkChainId.bscMainnet, MAINNET_BSC_KABY_MARKET), _MARKETPLACE_ADDRESS);

function getKabyMarketAddress(chainId) {
  return MARKETPLACE_ADDRESS[chainId];
}