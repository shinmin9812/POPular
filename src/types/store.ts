import { Brand } from './brand';
import { SNS } from './sns';

export interface Store {
  id: string;
  title: string;
  description: string;
  brand: Brand;
  startDate: string;
  endDate: string;
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
  price: number | null;
  sns: [
    {
      linkType: SNS;
      linkTitle: string;
      link: string;
    },
  ];
  reservationRequired: boolean;
  images: string[];
  scrap: number;
}
