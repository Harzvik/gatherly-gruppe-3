/*Alex Harsvik*/
export type MeetupsType = {
  id: number;
  userId: number;
  name: string;
  description: string;
  location: string;
  date: string;
  tags: string[];
  created: string;
  updated: string;
  participants: number[]; // Liste over brukerIDer som deltar
  likedBy: number[];      // Liste over brukerIDer som liker arrangementet
};
