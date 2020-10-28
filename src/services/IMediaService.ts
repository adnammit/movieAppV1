import User from '@/models/user';
import Movie from '@/models/movie';
import UserMovie from '@/models/dto/userMovie';

export default abstract class IMediaService {
	// we don't actually need this right now cos we just use the okta user
	abstract async getUsers(): Promise<User[]>;
	abstract async getUserMovies(userid: number): Promise<UserMovie[]>;
	abstract async updateUserMovie(userid: number, movie: Movie): Promise<boolean>;
}
