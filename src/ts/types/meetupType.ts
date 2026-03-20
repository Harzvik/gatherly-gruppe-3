/*Alex Harsvik*/
export type MeetupsType = {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  tags: string[];
  created: string;
  updated: string;
  //forslag til flere:
  //imageUrl: string;
  //owner: string;
  //participants: string[];
  //comments: string[]; denne er kanskje ikke nødvendig siden vi har posts som et eget obj
};
