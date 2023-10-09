import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { generateAccessToken } from '../middlewares/jwt';
import { LoginUserDto } from '../dtos/login-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { verifyToken } from '../middlewares/jwt';

export class AuthController {
	constructor(private readonly userService: UserService) {}

	getAuth(req: Request, res: Response, next: NextFunction) {
		try {
			const key = 'accessToken';
			const { cookie } = req.headers;
			console.log(cookie);

			// to slice after "=" ex:accessToken=...
			const accessToken = cookie?.split('; ')?.find((el) => el.includes(key))?.slice(key.length + 1);
			console.log('accessToken', accessToken, typeof accessToken);

			if (accessToken) {
				const payload = verifyToken(accessToken);
				console.log(payload);
				if (payload) {
					return res.status(200).json({ auth:true });
				}
			}
			// res.status(401).send(new Error('Unauthorized'));
			throw new Error('Unauthorized');
		} catch (error) {
			next(error);
			// res.status(400).json({ ...error });
		}
	}

	async register(req: Request, res: Response) {
		try {
			const createUserDto: CreateUserDto = req.body;
			const user = await this.userService.create(createUserDto);

			const accessToken = generateAccessToken({
				id: user.id,
				email: user.email,
			});

			res.cookie('accessToken', accessToken, {
				httpOnly: true,
				secure: true,
				maxAge: Number(process.env.JWT_MAX_AGE), // to config in env
			});
			res.status(201).json({ success: true });
		} catch (error) {
			const existAlready = error.message === 'User already exist';
			//409 conflict when user exist already
			const code = existAlready ? 409 : 500;
			res.status(code).json({ error: error.message });
		}
	}

	async login(req: Request, res: Response) {
		try {
			const loginUserDto: LoginUserDto = req.body;

			const user = await this.userService.findByEmailAndPassword(loginUserDto);

			const accessToken = generateAccessToken({
				id: user.id,
				email: user.email,
			});

			res.cookie('accessToken', accessToken, {
				httpOnly: true,
				secure: true,
				maxAge: Number(process.env.JWT_MAX_AGE), // to config in env
			});

			res.status(200).json({ success: true });
		} catch (error) {
			res.status(401).json({ error: error.message });
		}
	}

	async logout(req: Request, res: Response) {
		try {
			res.cookie('accessToken', '', { maxAge: 0 });
			res.clearCookie('accessToken');
			res.status(200).json({ success:true });
		} catch (error) {
			res.status(401).json({ error:error.message });
		}
	}
}
