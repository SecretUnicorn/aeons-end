import { AxiosResponse } from 'axios';

import { IBuyInterest, IPaginatedResponse } from '@/models/buyInterestModels';

import BaseApi from './base';

export const fetchAllIntersts = (
  page = 1,
  itemsPerPage = 25,
): Promise<AxiosResponse<IPaginatedResponse<IBuyInterest>, any>> =>
  BaseApi.get('/interests', { params: { limit: itemsPerPage, page: page } });
