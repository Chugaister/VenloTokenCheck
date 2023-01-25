from core.scanner import verify
from time import time


if __name__ == "__main__":
    t = time()
    print(verify("BSC-testnet", "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"))
    print(time() - t)
