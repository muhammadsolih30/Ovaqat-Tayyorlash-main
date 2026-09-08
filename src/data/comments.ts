export interface Comment {
  id: string;
  videoId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
  likes: number;
  liked?: boolean;
}

export const initialComments: Comment[] = [
  {
    id: "c-1",
    videoId: "v1",
    authorName: "Dilshod Aliyev",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    text: "Haqiqiy Toshkent oshi bo'libdi! Zirvakni qovurish sirlarini juda aniq tushuntiribsiz, rahmat usta!",
    createdAt: "2 kun oldin",
    likes: 24,
  },
  {
    id: "c-2",
    videoId: "v1",
    authorName: "Madina Karimova",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    text: "Devzira guruchni qancha vaqt ivitib qo'yish kerakligi haqida ham aytib o'tsangiz zo'r bo'lardi. Video juda ajoyib!",
    createdAt: "1 kun oldin",
    likes: 12,
  },
  {
    id: "c-3",
    videoId: "v1",
    authorName: "Sardorbek",
    authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop",
    text: "Oshingizga gap yo'q, bugun oilamiz bilan tayyorlab ko'rdik, hamma mazza qilib yedi!",
    createdAt: "5 soat oldin",
    likes: 8,
  },
  {
    id: "c-4",
    videoId: "v2",
    authorName: "Nigora Umarova",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    text: "Lag'mon xamirini cho'zishni hecham eplolmasdim, siz ko'rsatgandek moylab tindirganimdan so'ng bir urinishda o'xshadi!",
    createdAt: "3 kun oldin",
    likes: 31,
  },
  {
    id: "c-5",
    videoId: "v3",
    authorName: "Jasur Mahmudov",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    text: "Gaz pechida tandir effektini berish uchun eng zo'r maslahat bo'ldi.",
    createdAt: "1 hafta oldin",
    likes: 19,
  },
];
