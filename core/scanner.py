from os import path
from json import load

from web3 import Web3
from web3.exceptions import ContractLogicError
from web3.middleware import geth_poa_middleware

from . import DIR


class Scanner:

    def __init__(self, network: str):
        self.network = network
        with open(path.join(DIR, "config.json"), "r") as file:
            self.config = load(file)[network]
        self.w3 = Web3(Web3.HTTPProvider(self.config["providers"][1]))
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        with open(path.join(DIR, "ABI", "factory.json"), "r") as file:
            factoryABI = load(file)
        self.factory = self.w3.eth.contract(self.config["factory"], abi=factoryABI)
        with open(path.join(DIR, "ABI", "contract.json"), "r") as file:
            contractABI = load(file)
        self.contract = self.w3.eth.contract(self.config["contract"], abi=contractABI)

    def isListed(self, tokenAddress: str) -> bool:
        return self.factory.functions.getPair(
            self.config["WETH"],
            tokenAddress
        ).call() != "0x0000000000000000000000000000000000000000"

    def getErrorCode(self, tokenAddress: str) -> str:
        txn = self.contract.functions.verifyWithETH(
            tokenAddress,
            self.config["router"]
        ).buildTransaction({
            "from": self.config["account"],
            "value": 10**15,
            "gasPrice": self.w3.eth.gasPrice
        })
        errorCode = ""
        try:
            self.w3.eth.estimate_gas(txn)
        except ContractLogicError as e:
            errorStr = str(e)
            errorStr.replace("web3.exceptions.ContractLogicError: ", "")
        return errorCode


with open(path.join(DIR, "config.json"), "r") as file:
    config = load(file)
available_networks = list(config.keys())


def scannersInit() -> dict[str: Scanner]:
    scanners = {}
    for network in available_networks:
        scanners[network] = Scanner(network)
    return scanners


scanners = scannersInit()


def verify(network: str, tokenAddress: str):
    result = {
        "network": network,
        "token_address": tokenAddress
    }
    try:
        scanner = scanners[network]
    except KeyError:
        result["error_code"] = None
        result["description"] = "unsupported network"
        result["scam"] = None
        return result
    if not scanner.isListed(tokenAddress):
        result["error_code"] = None
        result["description"] = "token is not listed"
        result["scam"] = None
        return result
    result["errorCode"] = scanner.getErrorCode(tokenAddress)
    if result["errorCode"] != "":
        result["description"] = "most likely token is scam"
        result["scam"] = True
    else:
        result["description"] = "token is clear"
        result["scam"] = False
    return result
