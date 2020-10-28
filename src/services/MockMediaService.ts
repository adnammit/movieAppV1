import User from '@/models/user';
import Movie from '@/models/movie';
import UserMovie from '@/models/dto/userMovie';
import IMediaService from '@/services/IMediaService';
// import mockData from '@/data.json';

class MockMediaService implements IMediaService {
	// we don't actually need this right now cos we just use the okta user
	public async getUsers(): Promise<User[]> {
		return [];
	}

	public async getUserMovies(userid: number): Promise<UserMovie[]> {
		// const json = require('@/data.json');
		// const userData = mockData.data.find((d: any) => d.Email === 'amandaryman@gmail.com');
		// const userData = {};
		return [] as UserMovie[];
	}

	public async updateUserMovie(userid: number, movie: Movie): Promise<boolean> {
		return true;
	}
}

export default new MockMediaService();
