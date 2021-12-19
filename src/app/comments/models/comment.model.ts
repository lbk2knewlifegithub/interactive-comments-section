import { User } from '.';

export interface Comment {
  id: number;
  content: string;
  createdAt: number;
  score: number;
  user: User;
  replies: Comment[];
}
