import { IPostsComments } from '../interfaces';

export class CacheService {
  static cacheKey = 'allPostsData';

  static setDataInCache(allPostsData: IPostsComments): void {
    localStorage.setItem(this.cacheKey, JSON.stringify({
      allPostsData,
      expirationTimestamp: this.getExpirationTimestamp(),
    }));
  }

  static getDataFromCache(): null | IPostsComments {
    try {
      const cacheValue = localStorage.getItem(this.cacheKey);
      let parsedCacheValue: any;
      if (cacheValue) {
        parsedCacheValue = JSON.parse(cacheValue);

        if (parsedCacheValue.expirationTimestamp > Date.now()) {
          return parsedCacheValue.allPostsData;
        }
      }

      localStorage.removeItem(this.cacheKey);
      return null;
    } catch (error) {
      return null;
    }
  }

  // 2 min
  static getExpirationTimestamp = (): number => Date.now() + 2 * 60 * 1000;
}
