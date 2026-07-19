export interface TransactionReceipt {
  status: number;
  blockNumber: number;
  transactionHash: string;
  gasUsed: string;
}

export interface CommitResult {
  proofHash: string;
  receipt: TransactionReceipt;
  timestamp: number;
}

export interface VerifyResult {
  verified: boolean;
  receipt: TransactionReceipt;
  missionOutcome: string;
}

export interface IMidnightService {
  commitStrategy(strategyHash: string): Promise<CommitResult>;
  verifyMission(gameId: string, proofHash: string): Promise<VerifyResult>;
  finishMission(gameId: string): Promise<{ success: boolean; receipt: TransactionReceipt }>;
}
