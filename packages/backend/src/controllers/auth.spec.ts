import { Request, Response } from 'express';
import { registerUserController } from './auth';

describe('Testing Auth Controllers', () => {
  it('should register a user successfully when provided with valid data', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'password123',
        name: 'Test',
        last_name: 'User',
        birthday: new Date('1990-01-01'),
        email: 'testuser@example.com',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const mockRegisterUserService = jest
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      .spyOn(require('../services/Auth'), 'registerUserService')
      .mockResolvedValue({});

    await registerUserController(req, res);

    expect(mockRegisterUserService).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'success',
        message: 'User successfully registered',
      }),
    );

    mockRegisterUserService.mockRestore();
  });

  // Tests if the user registration controller handles errors properly when registration fails

  it('should handle error when user registration fails', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'password123',
        name: 'Test',
        last_name: 'User',
        birthday: new Date('1990-01-01'),
        email: 'testuser@example.com',
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const mockRegisterUserService = jest
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      .spyOn(require('../services/Auth'), 'registerUserService')
      .mockRejectedValue(new Error('Registration failed'));

    await registerUserController(req, res);

    expect(mockRegisterUserService).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(new Error('Registration failed'));

    mockRegisterUserService.mockRestore();
  });
});
