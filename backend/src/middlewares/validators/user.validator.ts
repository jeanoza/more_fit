import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { validate } from 'class-validator';

export async function validateCreateUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { body } = req;
		console.log(body);
		const createUserDto = new CreateUserDto();
		createUserDto.nickName = body.nick_name;
		createUserDto.firstName = body.first_name;
		createUserDto.lastName = body.last_name;
		createUserDto.email = body.email.toLowerCase(); // FIXME: this way is correct and clean?
		createUserDto.password = body.password;
		createUserDto.age = body.age ?? null;

		const errors = await validate(createUserDto);

		// FIXME: send all constrains or first one??
		// Here, I send all like {error:["not valid email", "password should ..."]} => error:string[]
		// But it will cause conflit when send 500 or 404 {error:"Internal Server Error"} => error:string
		if (errors.length > 0) {
			const rangedErrors = errors.map((_err) => {
				const contraints = Object.values(_err.constraints!)[0];
				return contraints;
			});
			return res.status(403).json({ error: rangedErrors });
		}
		req.body = createUserDto;
		next();
	} catch (error) {
		console.error('Error during validation:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}
