import { DeleteResult, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import bcrypt from 'bcrypt';

describe('UserService', () => {
	let userRepository: Repository<User>;
	let userService: UserService;
	const mockUser1: User = new User();
	const mockUser2: User = new User();
	const mockUserList: User[] = [mockUser1, mockUser2];

	beforeEach(() => {
		mockUser1.id = 1;
		mockUser1.nickName = 'JohnD';
		mockUser1.firstName = 'John';
		mockUser1.lastName = 'Doe';
		mockUser1.age = 18;
		mockUser1.email = 'johndoe@example.com';
		mockUser1.password = 'test password';

		mockUser2.id = 2;
		mockUser2.nickName = 'JPS';
		mockUser2.firstName = 'Jean-Paul';
		mockUser2.lastName = 'Sartre';
		mockUser2.age = 81;
		mockUser2.email = 'jean.paul@gmail.com';
		mockUser2.password = 'test password';

		userRepository = {
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
			delete: jest.fn(),
		} as unknown as Repository<User>;

		userService = new UserService(userRepository);
	});

	describe('findAll', () => {
		it('sholud returns user list', async() => {
			jest.spyOn(userRepository, 'find').mockResolvedValueOnce(mockUserList);

			const result = await userService.findAll();

			expect(result).toStrictEqual(mockUserList);
			expect(userRepository.find).toHaveBeenCalledWith();
		});
		it('sholud returns an empty array when no user in repository', async() => {
			jest.spyOn(userRepository, 'find').mockResolvedValueOnce([]);

			const result = await userService.findAll();

			expect(result).toStrictEqual([]);
			expect(userRepository.find).toHaveBeenCalledWith();
		});
	});

	describe('findById', () => {
		it('should find a user by id', async() => {
			jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser2);

			const id = 2;
			const result = await userService.findById(id);
			expect(result).toStrictEqual(mockUser2);
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id } });
		});
		it('sholud throw an error if no user with current id', async() => {
			const id = 3;
			await expect(userService.findById(id)).rejects.toThrow('User not found');
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id } });
		});
	});

	describe('findByEmail', () => {
		it('should find a user by email', async() => {
			jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser1);

			const email = mockUser1.email;
			const result = await userService.findByEmail(email);
			expect(result).toStrictEqual(mockUser1);
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
		});
		it('sholud throw an error if no user with current email', async() => {
			const email = 'exemple@exemple.com';
			await expect(userService.findByEmail(email)).rejects.toThrow(
				'User not found'
			);
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
		});
	});

	describe('findByEmailAndPassword', () => {
		const ERROR_MSG = 'Wrong email or password';
		const loginUserDto = new LoginUserDto();
		loginUserDto.email = mockUser1.email;
		loginUserDto.password = mockUser1.password;

		it('should return a user by mail and password', async() => {
			jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser1);
			jest
				.spyOn(bcrypt, 'compare')
				.mockImplementation(() => Promise.resolve(true));

			const result = await userService.findByEmailAndPassword(loginUserDto);

			expect(result).toStrictEqual(mockUser1);
		});

		it('should throw a error when email is wrong', async() => {
			jest
				.spyOn(userRepository, 'findOne')
				.mockImplementation(() => Promise.resolve(null));

			await expect(
				userService.findByEmailAndPassword(loginUserDto)
			).rejects.toThrow(ERROR_MSG);
		});

		it('should throw a error when password is wrong', async() => {
			jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser1);
			jest
				.spyOn(bcrypt, 'compare')
				.mockImplementation(() => Promise.resolve(false));

			await expect(
				userService.findByEmailAndPassword(loginUserDto)
			).rejects.toThrow(ERROR_MSG);
		});
	});

	describe('create', () => {
		it('should create and return a user', async() => {
			const body = { ...mockUser1 };

			jest.spyOn(userRepository, 'save').mockResolvedValueOnce(mockUser1);

			const user = await userService.create(body as User);
			expect(userRepository.save).toHaveBeenCalledWith(body);
			expect(user).toStrictEqual(mockUser1);
		});

		it('should throw error if user exist already', async() => {
			const body = { ...mockUser1 };

			jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser1);
			await expect(userService.create(body as User)).rejects.toThrow(
				'User already exist'
			);
		});

		it('should throw an error if failed to create user', async() => {
			const body = { ...mockUser1 };

			jest
				.spyOn(userRepository, 'save')
				.mockRejectedValueOnce(new Error('Failed to create user'));

			await expect(userService.create(body as User)).rejects.toThrow(
				'Failed to create user'
			);
		});
	});

	describe('update', () => {
		it('sholud update user', async() => {
			const body = {
				firstName: 'kyubong',
				lastName: 'choi',
			};
			const updatedUser = mockUser1;
			const id = mockUser1.id;
			updatedUser.firstName = body.firstName;
			updatedUser.lastName = body.lastName;

			jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser1);
			jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);

			const result = await userService.update(body as User, id);

			expect(result).toStrictEqual(updatedUser);
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id } });
			expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
		});
	});

	describe('delete', () => {
		it('should delete user', async() => {
			jest
				.spyOn(userRepository, 'delete')
				.mockResolvedValue({ affected: 1 } as DeleteResult);

			const id = 2;
			const result: DeleteResult = await userService.delete(id);

			expect(result.affected).toStrictEqual(1);
			expect(userRepository.delete).toHaveBeenCalledWith(id);
		});
	});
});
