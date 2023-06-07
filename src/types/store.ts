import { Category } from './category';
import { SNSType } from './sns';

export interface Store {
  _id: string;
  title: string;
  description: string;
  category: Category;
  start_date: string;
  end_date: string;
  hours: {
    mon: {
      start: string | null;
      end: string | null;
    };
    tue: {
      start: string | null;
      end: string | null;
    };
    wed: {
      start: string | null;
      end: string | null;
    };
    thu: {
      start: string | null;
      end: string | null;
    };
    fri: {
      start: string | null;
      end: string | null;
    };
    sat: {
      start: string | null;
      end: string | null;
    };
    sun: {
      start: string | null;
      end: string | null;
    };
  };
  location: string;
  postcode: {
    sido: string;
    sigungu: string;
  };
  coord: {
    lat: string;
    lng: string;
  };
  price: number | null;
  sns: SNSType[];
  reservation_required: boolean;
  images: string[];
  scrap: number;
}
