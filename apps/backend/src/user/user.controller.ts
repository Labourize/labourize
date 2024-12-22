import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, UserDeviceIdDto, UserResponseDto, VerifyUserDto } from './interfaces';
import { UserService } from './services';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:deviceId')
  @ApiOperation({ summary: 'Check by deviceId' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiParam({
    name: 'deviceId',
    type: String,
    description: 'The unique device ID of the user',
    example: 'abc12345',
  })
  async getUserByDeviceId(@Param() deviceIdDto: UserDeviceIdDto) {
    return this.userService.checkUserByDeviceId(deviceIdDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.successResponse(await this.userService.createUser(createUserDto), 'User created successfully');
  }

  @Post('/verify')
  @ApiOperation({ summary: 'OTP verificatioin of a user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async verifyUser(@Body() verifyUserDto: VerifyUserDto): Promise<string> {
    return this.userService.verifyUser(verifyUserDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: [UserResponseDto] })
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.findAllUsers();
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the user', example: 'b3b8f887-79b8-4f8d-b1e4-8b8b87b7e8e7' })
  @ApiResponse({ status: 200, description: 'User details', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') userId: string): Promise<UserResponseDto> {
    try {
      return await this.userService.findUserById(userId);
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the user', example: 'b3b8f887-79b8-4f8d-b1e4-8b8b87b7e8e7' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      return await this.userService.updateUser(userId, updateUserDto);
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the user', example: 'b3b8f887-79b8-4f8d-b1e4-8b8b87b7e8e7' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') userId: string): Promise<{ message: string }> {
    try {
      await this.userService.deleteUser(userId);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:userId/logout')
  @ApiOperation({ summary: 'Logged out user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'The unique user ID of the user',
    example: '5a460d56-6080-4302-bc74-7cb5bf1a4faf',
  })
  async loggedOutUser(@Param('userId') userId: string) {
    return this.successResponse(this.userService.userLogout(userId), 'User logged out successfully');
  }

  successResponse = (data: any, message: string) => ({ data, message });
}
