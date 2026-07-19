export interface LobbyConfig {
  maxPlayers: number;
  difficulty: string;
}

export interface LobbyInfo {
  lobbyId: string;
  txHash: string;
  createdAt: number;
  status: "WAITING" | "READY" | "IN_PROGRESS";
}

export interface IGameService {
  createLobby(config: LobbyConfig): Promise<LobbyInfo>;
  joinLobby(lobbyId: string): Promise<{ success: boolean; txHash: string }>;
}
