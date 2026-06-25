import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { asyncReceiveThreadDetail, clearThreadDetail, asyncAddComment } from '../states';
import Spinner from '../components/Spinner';

export default function DetailPage() {
  const { threadId: id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
    return () => dispatch(clearThreadDetail());
  }, [id, dispatch]);

  if (!threadDetail) {
    return <Spinner />;
  }

  const onComment = (e) => {
    e.preventDefault();
    dispatch(asyncAddComment({ threadId: id, content: comment }));
    setComment('');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-md font-medium border mb-4 inline-block">
          #
          {threadDetail.category}
        </span>
        <h1 className="text-3xl font-bold text-slate-800 mb-6">{threadDetail.title}</h1>
        <div className="prose max-w-none text-slate-700 mb-8">{parse(threadDetail.body)}</div>
        <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
          <img src={threadDetail.owner.avatar} alt="owner" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-bold text-slate-800">{threadDetail.owner.name}</p>
            <p className="text-xs text-slate-500">
              {new Date(threadDetail.createdAt).toLocaleDateString('id-ID')}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl">
          Komentar (
          {threadDetail.comments.length}
          )
        </h3>
        {authUser && (
          <form onSubmit={onComment} className="flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tulis komentar..."
              required
              className="flex-1 border rounded-lg p-3 text-sm focus:outline-emerald-500"
            />
            <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700">
              Kirim
            </button>
          </form>
        )}
        {threadDetail.comments.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <img src={c.owner.avatar} alt="user" className="w-6 h-6 rounded-full" />
              <div className="flex-1">
                <span className="font-bold text-sm">{c.owner.name}</span>
                <p className="text-xs text-slate-500">
                  {new Date(c.createdAt).toLocaleDateString('id-ID')}
                  {' '}
                  {new Date(c.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            <div className="text-slate-700 text-sm">{parse(c.content)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
