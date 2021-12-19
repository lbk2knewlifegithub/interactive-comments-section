import { User } from 'src/app/auth/models';

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Comment[];
  replyingTo?: string;
}
