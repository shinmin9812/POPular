import { Brand } from './brand';
import { SNS } from './sns';

export interface Store {
  id: string;
  title: string;
  description: string;
  brand: Brand;
  term: {
    start: string;
    end: string;
  };
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
  coord: {
    lat: string;
    lng: string;
  };
  fee: number | null;
  sns: [
    {
      snsType: SNS;
      name: string;
      url: string;
    },
  ];
  reservationRequired: boolean;
  images: string[];
  scrap: string[];
}
