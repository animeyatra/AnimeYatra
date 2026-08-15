import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, User, CornerDownRight } from 'lucide-react';
import { Comment } from '../types';

interface CommentsSectionProps {
  episodeId: string;
  initialCount: number;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ episodeId, initialCount }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c-1',
      user: 'Rohan_Otaku',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      text: 'The Hindi voice sync on this episode is top notch! Best anime streaming site AnimeYatra 🔥🔥',
      timestamp: '2 hours ago',
      likes: 42,
      replies: [
        {
          id: 'c-1-1',
          user: 'Animesh_07',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
          text: 'Agree! Voice direction is super smooth!',
          timestamp: '1 hour ago',
          likes: 12
        }
      ]
    },
    {
      id: 'c-2',
      user: 'Priya_K',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      text: 'Can you please upload Tamil & Telugu audio for next episode soon? Thank you team!',
      timestamp: '5 hours ago',
      likes: 28
    }
  ]);

  const [newCommentText, setNewCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      user: userName.trim() || 'Anime Fan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      text: newCommentText,
      timestamp: 'Just now',
      likes: 1,
      isLiked: true
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          const newReply: Comment = {
            id: `r-${Date.now()}`,
            user: userName.trim() || 'Otaku',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
            text: replyText,
            timestamp: 'Just now',
            likes: 1
          };
          return {
            ...c,
            replies: [...(c.replies || []), newReply]
          };
        }
        return c;
      })
    );
    setReplyToId(null);
    setReplyText('');
  };

  const toggleLike = (commentId: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            likes: c.isLiked ? c.likes - 1 : c.likes + 1,
            isLiked: !c.isLiked
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-violet-400" />
          <span>Episode Comments ({comments.length + initialCount})</span>
        </h3>
        <span className="text-xs text-zinc-500 font-mono">AnimeYatra Community</span>
      </div>

      {/* New Comment Input Box */}
      <form onSubmit={handleAddComment} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Your Name (Optional)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-1/3 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500"
          />
          <input
            type="text"
            placeholder="Write a comment about this episode..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500"
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-5 py-2 rounded-full flex items-center gap-1 transition shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3 pt-2">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={comment.avatar} alt={comment.user} className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <span className="text-xs font-bold text-zinc-200">{comment.user}</span>
                  <span className="text-[10px] text-zinc-500 ml-2">{comment.timestamp}</span>
                </div>
              </div>

              <button
                onClick={() => toggleLike(comment.id)}
                className={`text-xs flex items-center gap-1 transition px-2.5 py-1 rounded-full ${
                  comment.isLiked ? 'text-violet-400 bg-violet-950/60 border border-violet-800' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{comment.likes}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-300 pl-9">{comment.text}</p>

            {/* Reply trigger button */}
            <div className="pl-9 pt-1 flex items-center gap-3 text-[11px] text-violet-400">
              <button
                onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                className="hover:underline font-bold"
              >
                Reply
              </button>
            </div>

            {/* Nested Reply Form */}
            {replyToId === comment.id && (
              <div className="pl-9 pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-xs text-zinc-100"
                />
                <button
                  onClick={() => handleAddReply(comment.id)}
                  className="bg-violet-600 text-white text-xs px-4 py-1 rounded-full font-bold"
                >
                  Reply
                </button>
              </div>
            )}

            {/* Replies List */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-9 pt-2 space-y-2 border-t border-zinc-800 mt-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-2 items-start text-xs bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
                    <CornerDownRight className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-violet-300">{reply.user}: </span>
                      <span className="text-zinc-300">{reply.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
