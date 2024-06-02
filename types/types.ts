export interface KidData {
  username: string;
  image: string;
  completedTasks: any[]; // Adjust the type based on the actual data structure
  points: number;
}

export interface SessionUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
}
