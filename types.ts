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