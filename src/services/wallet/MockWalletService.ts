import { IWalletService, WalletState } from "./WalletService";
import { delay, generateHash } from "../utils";

export class MockWalletService implements IWalletService {
  private state: WalletState = {
    address: null,
    balance: 0,
    isConnected: false,
    network: "Disconnected"
  };

  async connectWallet(): Promise<WalletState> {
    await delay(1200); // Simulate wallet popup and approval
    
    this.state = {
      address: generateHash().substring(0, 42), // 0x + 40 chars
      balance: 150.75, // Fake midnight token balance
      isConnected: true,
      network: "Midnight Testnet v2"
    };

    return this.state;
  }

  async disconnectWallet(): Promise<void> {
    await delay(500);
    this.state = {
      address: null,
      balance: 0,
      isConnected: false,
      network: "Disconnected"
    };
  }

  async getWalletState(): Promise<WalletState> {
    return this.state;
  }
}
