"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAirdropHeroAddress = getAirdropHeroAddress;
exports.getKabyHeroAddress = getKabyHeroAddress;
exports.getHeroABI = exports.getAirdropHeroABI = void 0;

var _network = require("./network");

var _hero = _interopRequireDefault(require("./abis/hero.json"));

var _heroMain = _interopRequireDefault(require("./abis/heroMain.json"));

var _airdropHero = _interopRequireDefault(require("./abis/airdropHero.json"));

var _airdropHeroMain = _interopRequireDefault(require("./abis/airdropHeroMain.json"));

var _AirdropHeroAddress, _NetWorkAirdrop, _HeroAddress, _NetWork;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MAINNET_POLYGON_KABY_HERO = '';
var MAINNET_BSC_KABY_HERO = '';
var TESTNET_POLYGON_KABY_HERO = '';
var TESTNET_BSC_KABY_HERO = '0xaC8B09BF2b7185F3057d97208C544A6E91F8D636'; //=====================AIRDROP HERO=============================

var MAINNET_POLYGON_AIRDROP_HERO = '0xe0524698606dA087fd40E9ed633B3fA945DAAF80';
var MAINNET_BSC_AIRDROP_HERO = '0x139F711D771573387b076b351069c2aA97098AdD';
var TESTNET_POLYGON_AIRDROP_HERO = '0xFDa6CC713984F048df9c8AE0c76A27d5F0166E81';
var TESTNET_BSC_AIRDROP_HERO = '0x1EdaDe00a6DaA4341726A67BbCBC5B6C86ec5695';
var AirdropHeroAddress = (_AirdropHeroAddress = {}, _defineProperty(_AirdropHeroAddress, _network.networkChainId.polygonMainnet, MAINNET_POLYGON_AIRDROP_HERO), _defineProperty(_AirdropHeroAddress, _network.networkChainId.bscMainnet, MAINNET_BSC_AIRDROP_HERO), _defineProperty(_AirdropHeroAddress, _network.networkChainId.polygonTestnet, TESTNET_POLYGON_AIRDROP_HERO), _defineProperty(_AirdropHeroAddress, _network.networkChainId.bscTestnet, TESTNET_BSC_AIRDROP_HERO), _AirdropHeroAddress);

function getAirdropHeroAddress(chainId) {
  return AirdropHeroAddress[chainId];
}

var NetWorkAirdrop = (_NetWorkAirdrop = {}, _defineProperty(_NetWorkAirdrop, _network.networkChainId.bscMainnet, _airdropHeroMain.default), _defineProperty(_NetWorkAirdrop, _network.networkChainId.polygonMainnet, _airdropHeroMain.default), _defineProperty(_NetWorkAirdrop, _network.networkChainId.bscTestnet, _airdropHero.default), _defineProperty(_NetWorkAirdrop, _network.networkChainId.polygonTestnet, _airdropHero.default), _NetWorkAirdrop);

var getAirdropHeroABI = function getAirdropHeroABI(chainId) {
  return {
    AIRDROP_ABI: NetWorkAirdrop[chainId]
  };
};

exports.getAirdropHeroABI = getAirdropHeroABI;
var HeroAddress = (_HeroAddress = {}, _defineProperty(_HeroAddress, _network.networkChainId.polygonMainnet, MAINNET_POLYGON_KABY_HERO), _defineProperty(_HeroAddress, _network.networkChainId.bscMainnet, MAINNET_BSC_KABY_HERO), _defineProperty(_HeroAddress, _network.networkChainId.polygonTestnet, TESTNET_POLYGON_KABY_HERO), _defineProperty(_HeroAddress, _network.networkChainId.bscTestnet, TESTNET_BSC_KABY_HERO), _HeroAddress);

function getKabyHeroAddress(chainId) {
  return HeroAddress[chainId];
}

var NetWork = (_NetWork = {}, _defineProperty(_NetWork, _network.networkChainId.bscMainnet, _heroMain.default), _defineProperty(_NetWork, _network.networkChainId.polygonMainnet, _heroMain.default), _defineProperty(_NetWork, _network.networkChainId.bscTestnet, _hero.default), _defineProperty(_NetWork, _network.networkChainId.polygonTestnet, _hero.default), _NetWork);

var getHeroABI = function getHeroABI(chainId) {
  return {
    HERO_ABI: NetWork[chainId]
  };
};

exports.getHeroABI = getHeroABI;