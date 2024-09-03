import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  @ApiProperty({
    type: 'object',
    properties: {
      total: { type: 'number', description: 'Total number of users' },
      totalPages: { type: 'number', description: 'Total number of pages' },
      currentPage: { type: 'number', description: 'Current page number' },
      pageSize: { type: 'number', description: 'Number of users per page' },
    },
  })
  @ApiProperty()
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };

  @ApiProperty({
    description: 'data',
    type: 'array',
    items: { type: 'object' },
  })
  data: T[];
}
