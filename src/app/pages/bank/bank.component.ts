import { Component, OnInit } from '@angular/core';

//Forms
import { FormControl, FormGroup } from '@angular/forms'

//web3
declare let window: any;
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'


//Smart Contracts
import addresses from '../../../../web3/enviroment/contract-addresses.json';
import Bank from '../../../../web3/artifacts/web3/contracts/Bank.sol/Bank.json';
import Token from '../../../../web3/artifacts/web3/contracts/Token.sol/Token.json';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  loading: boolean = false
  messageLoading: string = ""

  isConnected: boolean = false
  wrongNetwork: boolean = false

  isUnlocked$ = new BehaviorSubject<boolean>(false);
  showConnectButton: boolean = true

  showApp$ = new BehaviorSubject<boolean>(false);
  showContent: boolean = false

  currentWalletAddress: string = ""

  public depositForm: FormGroup
  public withdrawForm: FormGroup

  public signer: any

  public bankContract: any
  public tokenContract: any

  public userTotalAssets: any = "0"
  public userTotalToken: any = "0"
  public totalAssets: any = "0"
  public signerAddress: any

  public tokenSymbol: string = "ETH"
  public yieldTokenSymbol: string = "FREE"

  constructor() {
    //FormGroup example: contactForm
    //FormControl example: myField
    this.depositForm = new FormGroup({
      DepositAmount: new FormControl()
    })
    this.withdrawForm = new FormGroup({
      WithdrawAmount: new FormControl()
    })
  }

  async ngOnInit() {
    this.loadObservables()
    await this.isWalletUnlocked()
    this.checkNetwork()
  }

  loadObservables() {
    this.isUnlocked$.subscribe(async (connected) => {
      console.log("isUnlocked", connected)
      if (connected) {
       await this.loadData()
        this.isConnected = true
       // this.showApp$.next(true)
      }
    })
    this.showApp$.subscribe(async (show) => {
      console.log("mostrarApp", show)
      this.showContent = show
    })

  }
  async loadData() {
    console.log("LOAD DATA")
    try {
      this.bankContract = new ethers.Contract(addresses.bankContract, Bank.abi, this.signer)
      console.log("bankContract", this.bankContract)
      this.totalAssets = ethers.utils.formatEther(await this.bankContract.totalSupply())
      console.log("this.totalAssets", this.totalAssets)
      this.tokenContract = new ethers.Contract(addresses.tokenContract, Token.abi, this.signer)
      console.log("tokenContract", this.tokenContract)

      this.userTotalAssets = ethers.utils.formatEther(await this.bankContract.accounts(await this.signer.getAddress()))
      this.userTotalToken = ethers.utils.formatEther(await this.tokenContract.balanceOf(await this.signer.getAddress()))
      this.signerAddress = await this.signer.getAddress()
      console.log("signerAddress", await this.signer.getAddress())
      this.showApp$.next(true)
      this.loading = false
    } catch (error) {
      this.loading = false
    }
  }
  async connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Wallet --> PROMPT user for account connections
    const accounts = await provider.send("eth_requestAccounts", []);
    this.currentWalletAddress = accounts[0]
    console.log("this.currentWalletAddress", this.currentWalletAddress)

    this.signer = provider.getSigner()
    console.log("this.signer", this.signer)

    //Update observable: isUnlocked$ 
    await this.isWalletUnlocked()

    this.showConnectButton = false
    
  }

  async isWalletUnlocked() {
    let provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    let signer = provider.getSigner();
    signer
      .getAddress()
      .then((address: string) => {
        this.isUnlocked$.next(true);
        //this.showApp$.next(true)
      })
      .catch((err) => {
        this.isUnlocked$.next(false)
        //this.showApp$.next(false)
      });
  }

  async checkNetwork() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork: any, oldNetwork: any) => {
      if (newNetwork.chainId !== 3) {
        this.wrongNetwork = true
        this.showConnectButton = false
        this.showApp$.next(false)
      } else {
        this.wrongNetwork = false
        this.showConnectButton = true
        
      }
    })
  }

  async deposit() {
    console.log("deposit...")
    const inputDepositAmount = this.depositForm.value.DepositAmount
    const depositAmount = ethers.utils.parseEther(inputDepositAmount.toString())
    console.log("depositAmount", depositAmount)
    this.loading = true
    this.messageLoading = "Sign the transaction with your wallet"
    const tx = await this.bankContract.deposit({ value: depositAmount })
    this.messageLoading = "...Waiting for Blockchain Confirmation"
    await tx.wait()
    this.depositForm.reset()
    await this.loadData()
  }

  async withdraw(){
    console.log("withdrawing...")
    const inputWithdrawAmount = this.withdrawForm.value.WithdrawAmount
    const withdrawAmount = ethers.utils.parseEther(inputWithdrawAmount.toString())
    this.loading = true
    this.messageLoading = "Sign the transaction with your wallet"
    const tix = await this.bankContract.withdraw(withdrawAmount, this.tokenContract.address)
    this.messageLoading = "...Waiting for Blockchain Confirmation"
    await tix.wait()
    this.withdrawForm.reset()
    await this.loadData()
  }

}
