import { HttpException, HttpStatus } from '@nestjs/common';

export enum Month {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER',
}

export enum BankingAccountType {
  CREDIT = 'CREDIT',
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
}

export enum OtherIncomeType {
  BONUS = 'BONUS',
  INVESTMENT_INCOME = 'INVESTMENT INCOME',
  FREELANCE = 'FREELANCE INCOME',
  BUSINESS = 'BUSINESS INCOME',
  INTEREST = 'INTEREST INCOME',
  DIVIDENDS = 'DIVIDEND INCOME',
  PENSION = 'PENSION',
  SOCIAL_SECURITY = 'SOCIAL SECURITY',
  VENMO = 'VENMO',
  BANK_TRANSFER = 'BANK TRANSFER',
  OTHER = 'OTHER INCOME',
}

export class EntityNotFoundException extends HttpException {
  constructor(entity: string, id: any) {
    super(`${entity} with ID ${id} not found`, HttpStatus.NOT_FOUND);
    this.name = 'EntityNotFoundException';
  }
}

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
