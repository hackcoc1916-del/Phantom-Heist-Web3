import { create } from 'zustand';

export type GameStatus = 'idle' | 'matchmaking' | 'lobby' | 'planning' | 'committing' | 'waiting' | 'simulation' | 'results';

export type Player = {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  hasCommitted: boolean;
};

interface GameState {
  lobbyId: string | null;
  status: GameStatus;
  players: Player[];
  playerLoadout: Record<string, string>;
  
  // Actions
  createLobby: () => string;
  joinLobby: (id: string) => void;
  simulateOpponentJoin: () => void;
  setPlayerReady: () => void;
  simulateOpponentReady: () => void;
  setLoadout: (item: string, value: string) => void;
  commitStrategy: () => void;
  simulateOpponentCommit: () => void;
  setStatus: (status: GameStatus) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  lobbyId: null,
  status: 'idle',
  players: [],
  playerLoadout: {},

  createLobby: () => {
    // Generate a realistic looking code like PH-9X2F
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'PH-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    set({
      lobbyId: code,
      status: 'lobby',
      players: [{ id: 'local-player', name: 'You (Operative)', isHost: true, isReady: false, hasCommitted: false }]
    });

    return code;
  },

  joinLobby: (id: string) => {
    set({
      lobbyId: id,
      status: 'lobby',
      players: [
        { id: 'host-player', name: 'Host (Specter)', isHost: true, isReady: false, hasCommitted: false },
        { id: 'local-player', name: 'You (Operative)', isHost: false, isReady: false, hasCommitted: false }
      ]
    });
  },

  simulateOpponentJoin: () => {
    const { players } = get();
    if (players.length < 2) {
      set({
        players: [
          ...players,
          { id: 'opponent', name: 'Opponent (Ghost)', isHost: false, isReady: false, hasCommitted: false }
        ]
      });
    }
  },

  setPlayerReady: () => {
    set((state) => ({
      players: state.players.map(p => p.id === 'local-player' ? { ...p, isReady: true } : p)
    }));
  },

  simulateOpponentReady: () => {
    set((state) => ({
      players: state.players.map(p => p.id !== 'local-player' ? { ...p, isReady: true } : p)
    }));
  },

  setLoadout: (item, value) => {
    set((state) => ({
      playerLoadout: { ...state.playerLoadout, [item]: value }
    }));
  },

  commitStrategy: () => {
    set((state) => ({
      status: 'committing',
      players: state.players.map(p => p.id === 'local-player' ? { ...p, hasCommitted: true } : p)
    }));
  },

  simulateOpponentCommit: () => {
    set((state) => ({
      players: state.players.map(p => p.id !== 'local-player' ? { ...p, hasCommitted: true } : p)
    }));
  },

  setStatus: (status) => set({ status }),

  resetGame: () => {
    set({
      lobbyId: null,
      status: 'idle',
      players: [],
      playerLoadout: {}
    });
  }
}));
