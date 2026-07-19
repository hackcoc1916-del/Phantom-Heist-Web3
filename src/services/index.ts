import { MockWalletService } from "./wallet/MockWalletService";
import { MockGameService } from "./game/MockGameService";
import { MockMidnightService } from "./midnight/MockMidnightService";
import type { IWalletService } from "./wallet/WalletService";
import type { IGameService } from "./game/GameService";
import type { IMidnightService } from "./midnight/MidnightService";

// For the hackathon demo, we export the MOCK implementations.
// When the SDK is ready, simply swap these instantiations with the real classes.
export const walletService: IWalletService = new MockWalletService();
export const gameService: IGameService = new MockGameService();
export const midnightService: IMidnightService = new MockMidnightService();

export * from "./wallet/WalletService";
export * from "./game/GameService";
export * from "./midnight/MidnightService";
