import { ActivityPreset, User } from './types';

export const ACTIVITY_PRESETS: ActivityPreset[] = [
  { id: '1', label: 'Coffee', emoji: '☕', defaultCaption: 'Need caffeine ASAP. Who\'s around?' },
  { id: '2', label: 'Drinks', emoji: '🍻', defaultCaption: 'Grab a beer? First round on me.' },
  { id: '3', label: 'Tacos', emoji: '🌮', defaultCaption: 'Taco Tuesday vibes (even if it\'s not Tuesday).' },
  { id: '4', label: 'Gym', emoji: '💪', defaultCaption: 'Hitting the iron paradise. Spotter needed.' },
  { id: '5', label: 'Study', emoji: '📚', defaultCaption: 'Focus mode. Library sesh?' },
  { id: '6', label: 'Walk', emoji: '🚶', defaultCaption: 'Touching grass. Join me for a stroll?' },
  { id: '7', label: 'Games', emoji: '🎮', defaultCaption: 'Hop on discord/console. Let\'s play.' },
  { id: '8', label: 'Movie', emoji: '🎬', defaultCaption: 'Cinema time. Popcorn included.' },
];

export const MOCK_FRIENDS: User[] = [
  { id: 'f1', name: 'Sarah Chen', handle: '@schen', avatarUrl: 'https://picsum.photos/100/100?random=1' },
  { id: 'f2', name: 'Marcus Johnson', handle: '@mjay', avatarUrl: 'https://picsum.photos/100/100?random=2' },
  { id: 'f3', name: 'Alex Kim', handle: '@akim', avatarUrl: 'https://picsum.photos/100/100?random=3' },
  { id: 'f4', name: 'Jessica Day', handle: '@jess', avatarUrl: 'https://picsum.photos/100/100?random=4' },
  { id: 'f5', name: 'David Miller', handle: '@dmill', avatarUrl: 'https://picsum.photos/100/100?random=5' },
];

export const TIME_OPTIONS = [
  { label: '30m', value: 30 * 60 * 1000 },
  { label: '1h', value: 60 * 60 * 1000 },
  { label: '2h', value: 2 * 60 * 60 * 1000 },
  { label: 'Tonight', value: 4 * 60 * 60 * 1000 },
];