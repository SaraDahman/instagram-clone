import {
  IFakeUser,
  IFakePost,
  IFakeComment,
  IFakeFollowing,
  IFakeLike,
  IFakeStory,
  IFakeViewers,
} from '../interfaces';

export const users: IFakeUser[] = [
  {
    //following 2 3 5
    username: 'Sara',
    name: 'sarsar',
    email: 'sara@gmail.com',
    password: '$2a$10$sFOY1/W8OwcNQLdlTqlmIumpOHke1EBpcjjluwJEhkoRy40pmMRAu', //123456
    private: true,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    //following 1 3 5
    username: 'Mohammed',
    name: 'hammoud',
    email: 'mohammed@gmail.com',
    password: '$2a$10$sFOY1/W8OwcNQLdlTqlmIumpOHke1EBpcjjluwJEhkoRy40pmMRAu', //123456
    private: true,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    //following 1 2 4
    username: 'Mustafa',
    name: 'tefo-king',
    email: 'mustafa@gmail.com',
    password: '$2a$10$sFOY1/W8OwcNQLdlTqlmIumpOHke1EBpcjjluwJEhkoRy40pmMRAu', //123456
    private: true,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    //following 5
    username: 'Lama',
    name: 'L',
    email: 'lama@gmail.com',
    password: '$2a$10$sFOY1/W8OwcNQLdlTqlmIumpOHke1EBpcjjluwJEhkoRy40pmMRAu', //123456
    private: false,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    //following 2
    username: 'Caramella',
    name: 'black hole',
    email: 'caramella@gmail.com',
    password: '$2a$10$sFOY1/W8OwcNQLdlTqlmIumpOHke1EBpcjjluwJEhkoRy40pmMRAu', //123456
    private: false,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
];

export const posts: IFakePost[] = [
  {
    caption: 'sunset',
    media: [
      'https://earthsky.org/upl/2022/06/sunset-jun17-2022-Steve-Pond-Sussex-UK.jpeg',
    ],
    userId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    caption: 'sunset',
    media: [
      'https://i2-prod.dailypost.co.uk/incoming/article24798427.ece/ALTERNATES/s1200c/0_WS_STR_060820_SEAGULL_STOCKIMAGE_DOVER13JPG.jpg',
    ],
    userId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    caption: 'The beauty of Van Gogh',
    media: [
      'https://www.vincentvangogh.org/images/self-portrait.jpg',
      'https://media.architecturaldigest.com/photos/5a00df9a3043ef0ce17b8fe2/1:1/w_3152,h_3152,c_limit/32-2_vanGogh-OliveOrchard_front.jpg',
    ],
    userId: 3,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    caption: 'kookie',
    media: [
      'https://www.whattanews.com/assets/uploads/updates/2022-12-08/4069_7335008_236_updates.jpg',
    ],
    userId: 4,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    caption: 'Me in nature',
    media: [
      'https://images2.minutemediacdn.com/image/upload/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/87226-gettyimages-1247734973-fb624124040b7676d4da16f7b3666048.jpg',
      'https://excitedcats.com/wp-content/uploads/2021/01/black-norwegian-forest-cat_Elisa-Putti_Shutterstock.jpg',
    ],
    userId: 5,
    createdAt: '2022-12-15 15:55:13.446+02',
    updatedAt: '2022-12-15 15:55:13.446+02',
  },
  {
    caption: 'haha so funny',
    media: [
      'https://i1.sndcdn.com/artworks-RJG4jIrv6lZwWkQH-cWi6nA-t500x500.jpg',
    ],
    userId: 5,
    createdAt: '2022-12-20 15:55:13.446+02',
    updatedAt: '2022-12-20 15:55:13.446+02',
  },
];

export const following: IFakeFollowing[] = [
  {
    followerId: 2,
    followedId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 5,
    followedId: 2,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 2,
    followedId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 1,
    followedId: 2,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 1,
    followedId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 4,
    followedId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 2,
    followedId: 3,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 3,
    followedId: 2,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 3,
    followedId: 4,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 3,
    followedId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    followerId: 1,
    followedId: 3,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
];

export const comments: IFakeComment[] = [
  {
    comment: 'nice picture',
    userId: 2,
    postId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    comment: 'haha',
    userId: 2,
    postId: 6,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    comment: 'I love van gogh',
    userId: 1,
    postId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    comment: 'You look cute!',
    userId: 4,
    postId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
];

export const likes: IFakeLike[] = [
  {
    userId: 2,
    postId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    userId: 2,
    postId: 6,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    userId: 2,
    postId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    userId: 1,
    postId: 3,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    userId: 1,
    postId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    userId: 1,
    postId: 6,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    userId: 4,
    postId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
];

export const stories: IFakeStory[] = [
  {
    media:
      'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg',
    userId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    media:
      'https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=360',
    userId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    media:
      'https://i.pinimg.com/564x/d3/7f/3c/d37f3c1d5c32509932ac6e953958a49e--cat-wallpaper-iphone-wallpaper.jpg',
    userId: 5,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    media: 'https://w0.peakpx.com/wallpaper/296/813/HD-wallpaper-bts-ot7.jpg',
    userId: 4,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    media:
      'https://pm1.narvii.com/6348/6b30e281a44191763cfab05dd360c2f7b00f1145_hq.jpg',
    userId: 4,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    media:
      'https://static.designboom.com/wp-content/uploads/2022/05/strozzi-nft-db-500.jpg',
    userId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    media:
      'https://az334033.vo.msecnd.net/images-5/still-life-with-flowers-in-a-glass-vase-jan-davidsz-de-heem-1650-567066b1.jpg',
    userId: 2,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
];

export const viewers: IFakeViewers[] = [
  {
    storyId: 6,
    userId: 2,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    storyId: 6,
    userId: 3,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    storyId: 1,
    userId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    storyId: 1,
    userId: 2,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    storyId: 1,
    userId: 4,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    storyId: 2,
    userId: 1,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    storyId: 2,
    userId: 2,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
  {
    storyId: 2,
    userId: 4,
    createdAt: '2022-12-14 15:55:13.446+02',
    updatedAt: '2022-12-14 15:55:13.446+02',
  },
];
