import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { env } from 'process';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: ()=> {
    return v2.config({
      cloud_name: env.CLOUD_NAME,
      api_key: env.API_KEY,
      api_secret: env.API_SECRET,
    });
  },
};