export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
}

export interface Invite {
  id: string;
  creator: User;
  activity: string;
  emoji: string;
  caption: string;
  createdAt: number;
  expiresAt: number;
  attendees: string[]; // Array of user IDs
  location?: string;
}

export enum View {
  LOGIN = 'LOGIN',
  FEED = 'FEED',
  FRIENDS = 'FRIENDS',
  PROFILE = 'PROFILE',
  CREATE = 'CREATE',
}

export interface ActivityPreset {
  id: string;
  label: string;
  emoji: string;
  defaultCaption: string;
}

export type NavTab = 'feed' | 'friends' | 'profile';