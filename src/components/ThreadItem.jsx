import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ThreadItem({
  thread, user, authUser, onVote,
}) {
  const isUpvoted = authUser && thread.upVotesBy.includes(authUser.id);
  const isDownvoted = authUser && thread.downVotesBy.includes(authUser.id);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-medium border">
          #
          {thread.category}
        </span>
        <span className="text-slate-400 text-sm">
          {new Date(thread.createdAt).toLocaleDateString('id-ID')}
        </span>
      </div>
      <Link to={`/threads/${thread.id}`} className="text-xl font-bold text-slate-800 hover:text-emerald-600 mb-2 block">
        {thread.title}
      </Link>
      <div className="text-slate-600 text-sm line-clamp-3 mb-4">{parse(thread.body)}</div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onVote(thread.id, isUpvoted ? 0 : 1)}
            className={`flex items-center gap-1 ${isUpvoted ? 'text-emerald-600' : 'text-slate-500'}`}
          >
            <ThumbsUp className="w-4 h-4" />
            {' '}
            {thread.upVotesBy.length}
          </button>
          <button
            type="button"
            onClick={() => onVote(thread.id, isDownvoted ? 0 : -1)}
            className={`flex items-center gap-1 ${isDownvoted ? 'text-red-500' : 'text-slate-500'}`}
          >
            <ThumbsDown className="w-4 h-4" />
            {' '}
            {thread.downVotesBy.length}
          </button>
          <span className="flex items-center gap-1 text-slate-500">
            <MessageCircle className="w-4 h-4" />
            {' '}
            {thread.totalComments}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          Dibuat oleh
          {' '}
          <img src={user?.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
          {' '}
          {user?.name}
        </div>
      </div>
    </div>
  );
}
