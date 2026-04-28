export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export type ItemType = 'lost' | 'found';
export type ItemStatus = 'active' | 'resolved';
export type HandoverMethod = 'security' | 'direct' | 'both';

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  location: string;
  category: string;
  status: ItemStatus;
  reportedBy: string;
  reporterName: string;
  createdAt: any; // Firestore Timestamp or number
  latitude?: number;
  longitude?: number;
  handoverMethod?: HandoverMethod;
  securityLocation?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  authorName: string;
  authorId: string;
  createdAt: any;
  isFeatured?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}
