import { IMidnightService, CommitResult, VerifyResult, TransactionReceipt } from "./MidnightService";
import { delay, generateHash, getRandomInt } from "../utils";

export class MockMidnightService implements IMidnightService {
  
  private createFakeReceipt(): TransactionReceipt {
    return {
      status: 1,
      blockNumber: getRandomInt(149000, 150000),
      transactionHash: generateHash(),
      gasUsed: getRandomInt(21000, 85000).toString()
    };
  }

  async commitStrategy(_strategyHash: string): Promise<CommitResult> {
    console.log(`[Midnight SDK] Committing zero-knowledge strategy...`);
    await delay(3000); // Heavy cryptography/network delay simulation

    return {
      proofHash: generateHash(),
      receipt: this.createFakeReceipt(),
      timestamp: Date.now()
    };
  }

  async verifyMission(gameId: string, _proofHash: string): Promise<VerifyResult> {
    console.log(`[Midnight SDK] Verifying mission state on-chain for Game ${gameId}...`);
    await delay(2500);

    return {
      verified: true,
      receipt: this.createFakeReceipt(),
      missionOutcome: "SUCCESS"
    };
  }

  async finishMission(gameId: string): Promise<{ success: boolean; receipt: TransactionReceipt }> {
    console.log(`[Midnight SDK] Finalizing mission ${gameId} and distributing rewards...`);
    await delay(2000);

    return {
      success: true,
      receipt: this.createFakeReceipt()
    };
  }
}
