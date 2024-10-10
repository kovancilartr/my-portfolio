export interface projects {
  collectionId: string;
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  gitUrl: string;
  previewUrl: string;
}
export interface hero {
  collectionId: string;
  collectionName: string;
  id: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
  subtitle3: string;
  description: string;
  button_title: string;
  button_url: string;
  image: string;
  status: boolean
}
export interface archive {
  collectionId: string;
  collectionName: string;
  id: string;
  metric: string;
  value: string;
  postfix: string;
  prefix: string;
  icon_code: string;
}
export interface about {
  collectionId: string;
  collectionName: string;
  id: string;
  title: string;
  id_title: string;
  content: string;
  description: string;
  image: string;
}
export interface about_sub {
  collectionId: string;
  collectionName: string;
  id: string;
  description: string;
  image: string;
  status: boolean;
}