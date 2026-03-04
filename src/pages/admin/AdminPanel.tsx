import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { videos as initialVideos, Video, chefs } from '@/data/videos';
import {
  LayoutDashboard, PlaySquare, ChefHat, TrendingUp, Settings,
  LogOut, Plus, Edit2, Trash2, Eye, Clock, Star, Search,
  BarChart3, Users, Film, Heart, Leaf, X, Check, AlertTriangle, Shield
} from 'lucide-react';

interface AdminPanelProps {
  onExit: () => void;
}

type AdminPage = 'dashboard' | 'videos' | 'chefs' | 'stats' | 'settings';

const AdminPanel = ({ onExit }: AdminPanelProps) => {
  const { adminLogout } = useAdmin();
  const [activePage, setActivePage] = useState<AdminPage>('dashboard');
  const [videoList, setVideoList] = useState<Video[]>(initialVideos);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // New video form state
  const [newVideo, setNewVideo] = useState({
    title_uz: '', title_en: '', title_ru: '',
    chef: '', duration: '', cookTime: '', difficulty: 'easy',
    cuisine: 'uzbek', category: 'uzbek', calories: '',
    thumbnail: '', description_uz: '', description_en: '', description_ru: '',
  });

  const showNotif = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    adminLogout();
    onExit();
  };

  const handleDeleteVideo = (id: string) => {
    setVideoList(prev => prev.filter(v => v.id !== id));
    setDeleteConfirm(null);
    showNotif("Video muvaffaqiyatli o'chirildi!");
  };

  const handleAddVideo = () => {
    if (!newVideo.title_uz || !newVideo.chef) {
      showNotif("Sarlavha va oshpaz nomini kiriting!", 'error');
      return;
    }
    const v: Video = {
      id: `v${Date.now()}`,
      title: { uz: newVideo.title_uz, en: newVideo.title_en || newVideo.title_uz, ru: newVideo.title_ru || newVideo.title_uz },
      description: { uz: newVideo.description_uz || '—', en: newVideo.description_en || '—', ru: newVideo.description_ru || '—' },
      thumbnail: newVideo.thumbnail || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop`,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: newVideo.duration || '10:00',
      views: 0,
      cookTime: parseInt(newVideo.cookTime) || 30,
      difficulty: newVideo.difficulty as 'easy' | 'medium' | 'hard',
      cuisine: newVideo.cuisine,
      category: newVideo.category,
      chef: newVideo.chef,
      chefAvatar: 'https://i.pravatar.cc/150?img=1',
      tags: [newVideo.cuisine],
      publishedAt: new Date().toISOString().split('T')[0],
      calories: parseInt(newVideo.calories) || undefined,
      servings: 4,
      ingredients: [],
      steps: [],
    };
    setVideoList(prev => [v, ...prev]);
    setShowAddModal(false);
    setNewVideo({ title_uz: '', title_en: '', title_ru: '', chef: '', duration: '', cookTime: '', difficulty: 'easy', cuisine: 'uzbek', category: 'uzbek', calories: '', thumbnail: '', description_uz: '', description_en: '', description_ru: '' });
    showNotif("Yangi video qo'shildi!");
  };

  // Stats
  const totalViews = videoList.reduce((a, v) => a + v.views, 0);
  const totalVideos = videoList.length;
  const avgCookTime = Math.round(videoList.reduce((a, v) => a + v.cookTime, 0) / videoList.length);
  const uzbekCount = videoList.filter(v => v.cuisine === 'uzbek').length;

  const filtered = videoList.filter(v =>
    v.title.uz.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.chef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const G = '#1DB954';
  const navItems: { id: AdminPage; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'videos', label: 'Videolar', icon: PlaySquare },
    { id: 'chefs', label: 'Oshpazlar', icon: ChefHat },
    { id: 'stats', label: 'Statistika', icon: BarChart3 },
    { id: 'settings', label: 'Sozlamalar', icon: Settings },
  ];

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '12px', fontSize: '13px',
    background: 'rgba(21,128,61,0.06)', border: '1.5px solid rgba(21,128,61,0.2)',
    color: '#111827', outline: 'none', fontFamily: "'DM Sans', sans-serif",
  } as React.CSSProperties;

  const labelStyle = { fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' };

  return (
    <div className="min-h-screen flex" style={{ background: '#f0fdf4', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-[999] flex items-center gap-2 px-4 py-3 rounded-2xl text-white text-sm font-semibold shadow-2xl"
          style={{
            background: notification.type === 'success' ? 'linear-gradient(135deg, #1DB954, #15803d)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
            animation: 'slideIn 0.3s ease',
          }}>
          {notification.type === 'success' ? <Check size={16} /> : <AlertTriangle size={16} />}
          {notification.msg}
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-[220px] flex-shrink-0 flex flex-col h-screen sticky top-0 p-4"
        style={{ background: 'linear-gradient(180deg, #0d2818 0%, #15803d 100%)' }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 px-2 pt-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-black text-sm">Admin Panel</div>
            <div className="text-white/40 text-[10px]">CookTube</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActivePage(id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold"
              style={{
                background: activePage === id ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: activePage === id ? 'white' : 'rgba(255,255,255,0.55)',
                borderLeft: activePage === id ? '3px solid #1DB954' : '3px solid transparent',
              }}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 px-3 py-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{ background: 'rgba(29,185,84,0.3)' }}>👤</div>
            <div>
              <div className="text-white text-xs font-bold">muhammadsolih</div>
              <div className="text-green-400 text-[10px]">Super Admin</div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-red-500/20"
            style={{ color: 'rgba(255,150,150,0.8)' }}>
            <LogOut size={16} /> Chiqish
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0 p-6 overflow-auto">

        {/* ===== DASHBOARD ===== */}
        {activePage === 'dashboard' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-black" style={{ color: '#111827' }}>📊 Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">CookTube umumiy holati</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Jami Videolar', value: totalVideos, icon: Film, color: '#1DB954', bg: 'rgba(29,185,84,0.1)' },
                { label: "Jami Ko'rishlar", value: `${(totalViews / 1000).toFixed(0)}K`, icon: Eye, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
                { label: "O'rtacha Vaqt", value: `${avgCookTime} min`, icon: Clock, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                { label: "O'zbek Taomlari", value: uzbekCount, icon: Star, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: bg, color }}>+12%</span>
                  </div>
                  <div className="text-2xl font-black mb-1" style={{ color: '#111827' }}>{value}</div>
                  <div className="text-xs text-gray-500 font-medium">{label}</div>
                </div>
              ))}
            </div>

            {/* Recent videos table */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(21,128,61,0.08)' }}>
                <h3 className="font-black text-base" style={{ color: '#111827' }}>🎬 So'nggi videolar</h3>
                <button onClick={() => setActivePage('videos')} className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: 'rgba(29,185,84,0.1)', color: G }}>
                  Hammasini ko'rish →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'rgba(240,253,244,0.8)' }}>
                      {['Video', 'Oshpaz', "Ko'rishlar", 'Vaqt', 'Qiyinlik'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: '#6b7280' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {videoList.slice(0, 6).map((v, i) => (
                      <tr key={v.id} style={{ borderTop: '1px solid rgba(21,128,61,0.06)', background: i % 2 === 0 ? 'white' : 'rgba(240,253,244,0.3)' }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={v.thumbnail} alt="" className="w-12 h-8 rounded-lg object-cover flex-shrink-0" />
                            <span className="text-sm font-semibold line-clamp-1 max-w-[180px]" style={{ color: '#111827' }}>{v.title.uz}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium" style={{ color: G }}>{v.chef}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: '#6b7280' }}>{(v.views / 1000).toFixed(0)}K</td>
                        <td className="px-4 py-3 text-sm" style={{ color: '#6b7280' }}>{v.cookTime} min</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{
                            background: v.difficulty === 'easy' ? 'rgba(29,185,84,0.15)' : v.difficulty === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                            color: v.difficulty === 'easy' ? G : v.difficulty === 'medium' ? '#f59e0b' : '#ef4444',
                          }}>
                            {v.difficulty === 'easy' ? 'Oson' : v.difficulty === 'medium' ? "O'rta" : 'Qiyin'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cuisine distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)' }}>
                <h3 className="font-black text-sm mb-4" style={{ color: '#111827' }}>🍽️ Oshxona bo'yicha</h3>
                {['uzbek', 'italian', 'japanese', 'american', 'french'].map(cuisine => {
                  const count = videoList.filter(v => v.cuisine === cuisine).length;
                  const pct = Math.round((count / totalVideos) * 100);
                  return (
                    <div key={cuisine} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold capitalize" style={{ color: '#374151' }}>{cuisine}</span>
                        <span className="text-xs font-bold" style={{ color: G }}>{count} ta</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(21,128,61,0.1)' }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #1DB954, #15803d)' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)' }}>
                <h3 className="font-black text-sm mb-4" style={{ color: '#111827' }}>📈 Qiyinlik darajasi</h3>
                {[['easy', 'Oson', '#1DB954'], ['medium', "O'rta", '#f59e0b'], ['hard', 'Qiyin', '#ef4444']].map(([key, label, color]) => {
                  const count = videoList.filter(v => v.difficulty === key).length;
                  const pct = Math.round((count / totalVideos) * 100);
                  return (
                    <div key={key} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold" style={{ color: '#374151' }}>{label}</span>
                        <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
                      </div>
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== VIDEOS ===== */}
        {activePage === 'videos' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black" style={{ color: '#111827' }}>🎬 Videolar Boshqaruvi</h1>
                <p className="text-sm text-gray-500 mt-1">{videoList.length} ta video</p>
              </div>
              <button onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #1DB954, #15803d)', boxShadow: '0 4px 15px rgba(29,185,84,0.4)' }}>
                <Plus size={18} /> Yangi Video
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: G }} />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Video yoki oshpaz qidirish..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'white', border: '1.5px solid rgba(21,128,61,0.2)', color: '#111827', fontFamily: "'DM Sans', sans-serif" }} />
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'rgba(240,253,244,0.8)', borderBottom: '1px solid rgba(21,128,61,0.1)' }}>
                      {['#', 'Thumbnail', 'Sarlavha', 'Oshpaz', "Ko'rishlar", 'Davomiyligi', 'Qiyinlik', 'Amallar'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: '#6b7280' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v, i) => (
                      <tr key={v.id} style={{ borderTop: '1px solid rgba(21,128,61,0.06)', background: i % 2 === 0 ? 'white' : 'rgba(240,253,244,0.25)' }}>
                        <td className="px-4 py-3 text-xs font-bold" style={{ color: '#9ca3af' }}>{i + 1}</td>
                        <td className="px-4 py-3">
                          <img src={v.thumbnail} alt="" className="w-14 h-9 rounded-lg object-cover" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="max-w-[200px]">
                            <p className="text-sm font-semibold line-clamp-1" style={{ color: '#111827' }}>{v.title.uz}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{v.publishedAt}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium" style={{ color: G }}>{v.chef}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: '#6b7280' }}>{(v.views / 1000).toFixed(0)}K</td>
                        <td className="px-4 py-3 text-sm" style={{ color: '#6b7280' }}>{v.duration}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-bold" style={{
                            background: v.difficulty === 'easy' ? 'rgba(29,185,84,0.12)' : v.difficulty === 'medium' ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                            color: v.difficulty === 'easy' ? G : v.difficulty === 'medium' ? '#f59e0b' : '#ef4444',
                          }}>
                            {v.difficulty === 'easy' ? 'Oson' : v.difficulty === 'medium' ? "O'rta" : 'Qiyin'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => setDeleteConfirm(v.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-red-50"
                              style={{ color: '#ef4444' }}>
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-3xl mb-2">🔍</p>
                  <p className="text-sm text-gray-400">Natija topilmadi</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== CHEFS ===== */}
        {activePage === 'chefs' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-black" style={{ color: '#111827' }}>👨‍🍳 Oshpazlar</h1>
              <p className="text-sm text-gray-500 mt-1">{chefs.length} ta oshpaz</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chefs.map(chef => (
                <div key={chef.id} className="rounded-2xl p-5"
                  style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img src={chef.avatar} alt={chef.name} className="w-14 h-14 rounded-2xl object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: G }}>
                        <Check size={10} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-black text-base" style={{ color: '#111827' }}>{chef.name}</h3>
                      <p className="text-xs font-semibold" style={{ color: G }}>{chef.specialty.uz}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-xl font-black" style={{ color: '#111827' }}>{chef.videos}</div>
                      <div className="text-xs text-gray-400">Videolar</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black" style={{ color: '#111827' }}>
                        {videoList.filter(v => v.chef === chef.name).reduce((a, v) => a + v.views, 0) > 0
                          ? `${(videoList.filter(v => v.chef === chef.name).reduce((a, v) => a + v.views, 0) / 1000).toFixed(0)}K`
                          : '0'}
                      </div>
                      <div className="text-xs text-gray-400">Ko'rishlar</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black" style={{ color: '#111827' }}>
                        {videoList.filter(v => v.chef === chef.name).length}
                      </div>
                      <div className="text-xs text-gray-400">Aktiv</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== STATS ===== */}
        {activePage === 'stats' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-black" style={{ color: '#111827' }}>📈 Statistika</h1>
              <p className="text-sm text-gray-500 mt-1">Sayt faoliyati tahlili</p>
            </div>

            {/* Big stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Jami ko'rishlar", value: `${(totalViews / 1000).toFixed(1)}K`, sub: 'barcha videolar', icon: Eye, color: G },
                { label: 'Eng mashhur video', value: videoList.sort((a,b) => b.views - a.views)[0]?.title.uz.slice(0,20) + '...', sub: `${(Math.max(...videoList.map(v => v.views)) / 1000).toFixed(0)}K ko'rish`, icon: TrendingUp, color: '#3b82f6' },
                { label: "O'rtacha qiyinlik", value: `${Math.round(videoList.filter(v => v.difficulty === 'easy').length / totalVideos * 100)}% Oson`, sub: 'foydalanuvchilar uchun qulay', icon: Star, color: '#f59e0b' },
              ].map(({ label, value, sub, icon: Icon, color }) => (
                <div key={label} className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)' }}>
                  <Icon size={24} style={{ color }} className="mb-3" />
                  <div className="text-lg font-black mb-1 leading-tight" style={{ color: '#111827' }}>{value}</div>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: '#374151' }}>{label}</div>
                  <div className="text-xs text-gray-400">{sub}</div>
                </div>
              ))}
            </div>

            {/* Top 5 videos */}
            <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)' }}>
              <h3 className="font-black text-base mb-4" style={{ color: '#111827' }}>🏆 Top 5 Video</h3>
              {[...videoList].sort((a, b) => b.views - a.views).slice(0, 5).map((v, i) => (
                <div key={v.id} className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                    style={{ background: i === 0 ? '#f59e0b' : i === 1 ? '#9ca3af' : i === 2 ? '#cd7c00' : 'rgba(21,128,61,0.15)', color: i > 2 ? G : 'white' }}>
                    {i + 1}
                  </div>
                  <img src={v.thumbnail} alt="" className="w-12 h-8 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-1" style={{ color: '#111827' }}>{v.title.uz}</p>
                    <p className="text-xs" style={{ color: G }}>{v.chef}</p>
                  </div>
                  <div className="text-sm font-black flex-shrink-0" style={{ color: '#111827' }}>
                    {(v.views / 1000).toFixed(0)}K
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== SETTINGS ===== */}
        {activePage === 'settings' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-black" style={{ color: '#111827' }}>⚙️ Sozlamalar</h1>
            </div>
            <div className="max-w-lg space-y-4">
              <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)' }}>
                <h3 className="font-black text-sm mb-4" style={{ color: '#111827' }}>🔐 Admin ma'lumotlari</h3>
                <div className="space-y-3">
                  <div>
                    <label style={labelStyle}>Foydalanuvchi nomi</label>
                    <input type="text" value="muhammadsolih" readOnly style={{ ...inputStyle, opacity: 0.7 }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Parol</label>
                    <input type="password" value="muhammadsolihjon" readOnly style={{ ...inputStyle, opacity: 0.7 }} />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">* Ma'lumotlarni o'zgartirish uchun dasturchi bilan bog'laning</p>
              </div>

              <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(21,128,61,0.1)' }}>
                <h3 className="font-black text-sm mb-4" style={{ color: '#111827' }}>🌐 Sayt ma'lumotlari</h3>
                <div className="space-y-3">
                  {[['Sayt nomi', 'CookTube'], ['Versiya', '2.0.0'], ['Status', 'Aktiv']].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(21,128,61,0.08)' }}>
                      <span className="text-sm text-gray-500">{k}</span>
                      <span className="text-sm font-bold" style={{ color: '#111827' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleLogout}
                className="w-full py-3 rounded-2xl font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                Admin paneldan chiqish
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ===== DELETE CONFIRM MODAL ===== */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-sm rounded-3xl p-6" style={{ background: 'white' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(239,68,68,0.1)' }}>
              <AlertTriangle size={28} style={{ color: '#ef4444' }} />
            </div>
            <h3 className="text-lg font-black text-center mb-2" style={{ color: '#111827' }}>O'chirilsinmi?</h3>
            <p className="text-sm text-center text-gray-400 mb-6">Bu amalni qaytarib bo'lmaydi</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 rounded-xl font-bold text-sm" style={{ background: 'rgba(0,0,0,0.06)', color: '#374151' }}>
                Bekor qilish
              </button>
              <button onClick={() => handleDeleteVideo(deleteConfirm)}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== ADD VIDEO MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-2xl rounded-3xl p-6 max-h-[90vh] overflow-y-auto" style={{ background: 'white' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black" style={{ color: '#111827' }}>➕ Yangi Video Qo'shish</h3>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.06)' }}>
                <X size={16} style={{ color: '#6b7280' }} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['Sarlavha (UZ) *', 'title_uz', 'text'],
                ['Sarlavha (EN)', 'title_en', 'text'],
                ['Sarlavha (RU)', 'title_ru', 'text'],
                ['Oshpaz nomi *', 'chef', 'text'],
                ['Davomiyligi (10:30)', 'duration', 'text'],
                ['Pishirish vaqti (daqiqa)', 'cookTime', 'number'],
                ['Kaloriya', 'calories', 'number'],
                ['Thumbnail URL', 'thumbnail', 'url'],
              ].map(([label, key, type]) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input type={type} placeholder={label}
                    value={(newVideo as any)[key]}
                    onChange={e => setNewVideo(prev => ({ ...prev, [key]: e.target.value }))}
                    style={inputStyle} />
                </div>
              ))}

              <div>
                <label style={labelStyle}>Qiyinlik darajasi</label>
                <select value={newVideo.difficulty} onChange={e => setNewVideo(prev => ({ ...prev, difficulty: e.target.value }))} style={inputStyle}>
                  <option value="easy">Oson</option>
                  <option value="medium">O'rta</option>
                  <option value="hard">Qiyin</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Oshxona turi</label>
                <select value={newVideo.cuisine} onChange={e => setNewVideo(prev => ({ ...prev, cuisine: e.target.value }))} style={inputStyle}>
                  <option value="uzbek">O'zbek</option>
                  <option value="italian">Italyan</option>
                  <option value="japanese">Yapon</option>
                  <option value="american">Amerika</option>
                  <option value="french">Fransuz</option>
                  <option value="korean">Koreys</option>
                  <option value="indian">Hind</option>
                  <option value="mexican">Meksika</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label style={labelStyle}>Tavsif (UZ)</label>
                <textarea value={newVideo.description_uz} onChange={e => setNewVideo(prev => ({ ...prev, description_uz: e.target.value }))}
                  rows={3} style={{ ...inputStyle, resize: 'none' }} placeholder="Video haqida qisqacha..." />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-xl font-bold text-sm" style={{ background: 'rgba(0,0,0,0.06)', color: '#374151' }}>
                Bekor qilish
              </button>
              <button onClick={handleAddVideo}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #1DB954, #15803d)' }}>
                <Plus size={16} /> Qo'shish
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
};

export default AdminPanel;