import User from '@/models/user';
import Movie from '@/models/movie';
import Tv from '@/models/tv';
import UserMedia from '@/models/dto/userMedia';
import IMediaService from '@/services/IMediaService';
// import mockData from '@/data.json';

class MockMediaService implements IMediaService {
	public async getUsers(): Promise<User[]> {
		return [];
	}

	public async getUserMovies(userid: number): Promise<UserMedia[]> {
		// const json = require('@/data.json');
		// const userData = mockData.data.find((d: any) => d.Email === 'amandaryman@gmail.com');
		// const userData = {};
		return [] as UserMedia[];
	}

	public async addUserMovie(userid: number, movie: Movie): Promise<boolean> {
		return true;
	}

	public async updateUserMovie(userid: number, movie: Movie): Promise<boolean> {
		return true;
	}

	public async deleteUserMovie(userid: number, movie: Movie): Promise<boolean> {
		return true;
	}

	public async getUserTv(userid: number): Promise<UserMedia[]> {
		return [] as UserMedia[];
	}

	public async addUserTv(userid: number, tv: Tv): Promise<boolean> {
		return true;
	}

	public async updateUserTv(userid: number, tv: Tv): Promise<boolean> {
		return true;
	}

	public async deleteUserTv(userid: number, tv: Tv): Promise<boolean> {
		return true;
	}
}

export default new MockMediaService();
