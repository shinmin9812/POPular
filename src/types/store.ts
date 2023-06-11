import { Category } from './category';
import { SNSType } from './sns';

type DateType = string | null;

export interface Store {
  _id: string;
  title: string;
  description: string;
  category: Category;
  start_date: string;
  end_date: string;
  hours: {
    mon: {
      start: DateType;
      end: DateType;
    };
    tue: {
      start: DateType;
      end: DateType;
    };
    wed: {
      start: DateType;
      end: DateType;
    };
    thu: {
      start: DateType;
      end: DateType;
    };
    fri: {
      start: DateType;
      end: DateType;
    };
    sat: {
      start: DateType;
      end: DateType;
    };
    sun: {
      start: DateType;
      end: DateType;
    };
  };
  location: string;
  postcode: {
    sido: string;
    sigungu: string;
  };
  coord: {
    coordinates: [lat: number, lng: number];
    type?: 'Point';
  };
  price: number;
  sns: SNSType[];
  reservation_required: boolean;
  images: string[];
  scraps: string[];
  createdAt?: string;
}

type imageDeletedStore = Omit<Store, 'images' | '_id'>;

export interface PostedStore extends imageDeletedStore {
  images: any[];
}
