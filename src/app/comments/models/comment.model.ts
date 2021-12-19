import { User } from 'src/app/auth/models';

export interface Comment {
  id: number;
  content: string;
  createdAt: number;
  score: number;
  user: User;
  replies: Comment[];
  replyingTo?: string;
}
