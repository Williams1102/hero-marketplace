"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfoMarketplace = void 0;

var _wallet = require("./wallet");

var _contract = require("constant/contract");

var _web = _interopRequireDefault(require("web3"));

var _marketplace = require("constant/contract/marketplace");

var _kabyToken = require("constant/contract/kabyToken");

var _stakingPool = require("constant/contract/stakingPool");

var _summonStakingPool = require("constant/contract/summonStakingPool");

var _returnFormat = require("../utils/returnFormat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getInfoMarketplace = function getInfoMarketplace() {
  var _ref, chainId, getContractAsync, _getHeroABI, HERO_ABI, address, _ref2, heroContract, marketplaceNFTAddress, _getKabyMarketABI, MARKETPLACE_ABI, _ref3, marketplaceNFTContract, totalHero, listHero, i, infoPrice;

  return regeneratorRuntime.async(function getInfoMarketplace$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _wallet.getInfoWallet)());

        case 3:
          _ref = _context.sent;
          chainId = _ref.chainId;
          getContractAsync = _ref.getContractAsync;
          _getHeroABI = (0, _contract.getHeroABI)(chainId), HERO_ABI = _getHeroABI.HERO_ABI;
          address = (0, _contract.getKabyHeroAddress)(chainId);
          _context.next = 10;
          return regeneratorRuntime.awrap(getContractAsync(address, HERO_ABI));

        case 10:
          _ref2 = _context.sent;
          heroContract = _ref2.contract;
          console.log('🚀 ~ file: heroMarketNFT.js ~ line 26 ~ getInfoMarketplace ~ heroContract', heroContract);
          marketplaceNFTAddress = (0, _contract.getKabyMarketAddress)(chainId);
          _getKabyMarketABI = (0, _marketplace.getKabyMarketABI)(chainId), MARKETPLACE_ABI = _getKabyMarketABI.MARKETPLACE_ABI;
          _context.next = 17;
          return regeneratorRuntime.awrap(getContractAsync(marketplaceNFTAddress, MARKETPLACE_ABI));

        case 17:
          _ref3 = _context.sent;
          marketplaceNFTContract = _ref3.contract;
          _context.next = 21;
          return regeneratorRuntime.awrap(heroContract.totalSupply().call());

        case 21:
          totalHero = _context.sent;
          console.log('🚀 ~ file: heroMarketNFT.js ~ line 34 ~ getInfoMarketplace ~ totalHero', totalHero);

          if (totalHero) {
            _context.next = 25;
            break;
          }

          return _context.abrupt("return", (0, _returnFormat.returnSuccess)([]));

        case 25:
          listHero = [];
          i = 0;

        case 27:
          if (!(i < totalHero)) {
            _context.next = 37;
            break;
          }

          _context.next = 30;
          return regeneratorRuntime.awrap(marketplaceNFTContract.SaleInfos(i).call());

        case 30:
          infoPrice = _context.sent;
          console.log('====================================');
          console.log(infoPrice);
          console.log('====================================');

        case 34:
          i++;
          _context.next = 27;
          break;

        case 37:
          _context.next = 43;
          break;

        case 39:
          _context.prev = 39;
          _context.t0 = _context["catch"](0);
          console.log('🚀 ~ file: heroMarketNFT.js ~ line 48 ~ getInfoMarketplace ~ e', _context.t0);
          return _context.abrupt("return", (0, _returnFormat.returnError)(_context.t0.message));

        case 43:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 39]]);
};

exports.getInfoMarketplace = getInfoMarketplace;