import User from '@/models/user';
import Movie from '@/models/movie';
import UserMovie from '@/models/dto/userMovie';

export default abstract class IMediaService {
	abstract async getUsers(): Promise<User[]>;
	abstract async getUserMovies(userid: number): Promise<UserMovie[]>;
	abstract async updateUserMovie(userid: number, movie: Movie): Promise<boolean>;
	abstract async addUserMovie(userid: number, movie: Movie): Promise<boolean>;
	abstract async deleteUserMovie(userid: number, movie: Movie): Promise<boolean>;
}
