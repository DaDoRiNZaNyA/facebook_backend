import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UsersService } from './users.service.js';
import { PaginationResponseDto } from 'src/utils/pagination-respoonse.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({
    status: 200,
    description: 'List of users with pagination information',
    type: PaginationResponseDto,
  })
  findAll(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('search') search: string,
  ) {
    return this.usersService.findAll({ page, size, search });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'user ID' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь найден.',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
