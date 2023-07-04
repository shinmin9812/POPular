export const enum SNS {
  insta = 'insta',
  kakao = 'kakao',
  website = 'website',
}

export interface SNSType {
  link_type: string;
  link_title: string;
  link_url: string;
}
