import { Model } from '@nozbe/watermelondb';
import { date, field, json, readonly } from '@nozbe/watermelondb/decorators';

const sanitizeLoggedUserORGtree = (data: any): any => data;

class Organization_name extends Model {
  static table = 'organization';

  @json('org_name', sanitizeLoggedUserORGtree) OrgName: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

class Transaction extends Model {
  static table = 'transaction';
  @field('orderEntity') orderEntity!: number;
  @field('workProcess') workProcess!: string;
  @field('organization') organization!: number;
  @field('style') style!: number;
  @field('qualityType') qualityType!: number;
  @json('newQualityDefect', sanitizeLoggedUserORGtree) newQualityDefect: any;
  @field('sampleSize') sampleSize!: number; // Updated from string to number
  @field('checkOutput') checkOutput!: string; // Updated from number to string
  @field('productionTime') productionTime!: string; // Updated from number to string
  @field('transactionId') transactionId!: string; // Updated from number to string
  @field('deviceId') deviceId!: string;
  @field('isRepaired') isRepaired!: boolean;
  @json('varience', sanitizeLoggedUserORGtree) varience: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

class Count extends Model {
  static table = 'count';

  @field('total') total!: number;
  @field('pass') pass!: number;
  @field('alter') alter!: number;
  @field('reject') reject!: number;
  @field('repairPass') repairPass!: number;
  @field('repairAlter') repairAlter!: number;
  @field('repairReject') repairReject!: number;
  @field('offlinePass') offlinePass!: number;
  @field('productionFireTime') productionFireTime!: string;

  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

class TempData extends Model {
  static table = 'tempTable';

  @field('tampAlter') tampAlter!: number;

  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}

export { Count, Organization_name, TempData, Transaction };
