/* eslint-disable no-unused-vars */
import { IPostsComments, IDataCache } from '../interfaces';

export class CacheService {
  static cacheKey = 'allPostsData';

  static setDataInCache(allPostsData: IPostsComments): void {
    const cachedData = this.getDataFromLocalStorage();
    const expirationTimestamp = this.getExpirationTimestamp();
    if (cachedData) {
      const allData = JSON.stringify([...cachedData, {
        allPostsData,
        expirationTimestamp,
      }]);

      localStorage.setItem(this.cacheKey, allData);
    } else {
      localStorage.setItem(this.cacheKey, JSON.stringify([{ allPostsData, expirationTimestamp }]));
    }
  }

  static getDataFromCache(offset:number):null | IDataCache {
    let cachedData = this.getDataFromLocalStorage();

    if (cachedData) {
      cachedData = this.removeExpiredPostsFromCache(cachedData);
      cachedData = cachedData.filter((ele) => ele.allPostsData.offset === offset);
      return cachedData[0];
    }

    return null;
  }

  static getDataFromLocalStorage():null | IDataCache[] {
    const cacheValue = localStorage.getItem(this.cacheKey);
    let parsedCacheValue: IDataCache[];

    if (cacheValue) {
      parsedCacheValue = JSON.parse(cacheValue);
      return parsedCacheValue;
    }

    return null;
  }

  static checkExpirationTime(parsedCacheValue:any):boolean {
    if (parsedCacheValue?.expirationTimestamp > Date.now()) {
      return true;
    }

    return false;
  }

  static removeExpiredPostsFromCache(cachedPost:IDataCache[]):IDataCache[] {
    const filteredCachedData = cachedPost.filter((post) => this.checkExpirationTime(post));

    localStorage.setItem(this.cacheKey, JSON.stringify(filteredCachedData));
    return filteredCachedData;
  }

  // 2 min
  static getExpirationTimestamp = (): number => Date.now() + 1 * 60 * 1000;
}
