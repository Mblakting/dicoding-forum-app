import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import { LogOut, Trophy, MessageSquare } from 'lucide-react';
import { unsetAuthUser } from '../states';

const loadingBarStyle = {
  backgroundColor: '#10b981',
  height: '4px',
};

export default function Navbar() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <LoadingBar style={loadingBarStyle} />
      </div>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-emerald-600 flex items-center gap-2">
          <MessageSquare />
          {' '}
          DicodingForum
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/leaderboard" className="flex items-center gap-1 font-medium text-slate-600 hover:text-emerald-600">
            <Trophy className="w-5 h-5" />
            {' '}
            Klasemen
          </Link>
          {authUser ? (
            <div className="flex items-center gap-4">
              <img src={authUser.avatar} alt="avatar" className="w-8 h-8 rounded-full border" />
              <button
                type="button"
                onClick={() => dispatch(unsetAuthUser())}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-emerald-700">Login</Link>
          )}
        </div>
      </nav>
    </>
  );
}
