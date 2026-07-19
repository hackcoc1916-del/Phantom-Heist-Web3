export interface WalletState {
  address: string | null;
  balance: number;
  isConnected: boolean;
  network: string;
}

export interface IWalletService {
  connectWallet(): Promise<WalletState>;
  disconnectWallet(): Promise<void>;
  getWalletState(): Promise<WalletState>;
}
