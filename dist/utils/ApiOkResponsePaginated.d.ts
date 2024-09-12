import { Type } from '@nestjs/common';
export declare const ApiOkResponsePaginated: <DataDto extends Type<unknown>>(dataDto: DataDto) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
