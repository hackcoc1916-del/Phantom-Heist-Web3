import { IGameService, LobbyConfig, LobbyInfo } from "./GameService";
import { delay, generateHash, generateShortHash } from "../utils";

export class MockGameService implements IGameService {
  
  async createLobby(_config: LobbyConfig): Promise<LobbyInfo> {
    console.log(`[Game SDK] Creating new lobby on network...`);
    await delay(2000); // Network delay

    return {
      lobbyId: `PH-${generateShortHash().substring(2, 6).toUpperCase()}`,
      txHash: generateHash(),
      createdAt: Date.now(),
      status: "WAITING"
    };
  }

  async joinLobby(lobbyId: string): Promise<{ success: boolean; txHash: string }> {
    console.log(`[Game SDK] Joining lobby ${lobbyId}...`);
    await delay(1500); // Network delay

    return {
      success: true,
      txHash: generateHash()
    };
  }
}
