import pytest
from brownie import config
from brownie import Contract


@pytest.fixture
def deployer(accounts):
    yield accounts[0]

@pytest.fixture
def user(accounts):
    yield accounts[1]

@pytest.fixture
def fee_receiver(accounts):
    yield accounts[2]

@pytest.fixture
def tapir(accounts):
    yield accounts[3]

@pytest.fixture
def swap_contract(deployer, Swap):
    swap_contract = deployer.deploy(Swap)
    yield swap_contract

@pytest.fixture
def usdc_token(deployer, swap_contract, accounts):
    usdc_token_address = Contract("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174")
    reserve = accounts.at("0xF977814e90dA44bFA03b6295A0616a897441aceC", force=True) ## find a whale
    usdc_token_address.transfer(swap_contract.address, 20_000 * 1e6, {"from":reserve})
    usdc_token_address.approve(swap_contract.address, 20_000 * 1e6, {"from":reserve})
    yield usdc_token_address

@pytest.fixture
def buy_token():
    buy_token_address = Contract("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270")
    yield buy_token_address

@pytest.fixture
def allowance_target():
    allowance_target_address = Contract("0xDef1C0ded9bec7F1a1670819833240f027b25EfF")
    yield allowance_target_address
