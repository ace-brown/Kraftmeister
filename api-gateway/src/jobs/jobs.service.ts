import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {
  findAll() {
    return [
      {
        id: '1',
        title: 'Küche Wasserleitung reparieren',
        status: 'open',
        address: 'Stuttgart',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Heizung warten',
        status: 'in-progress',
        address: 'Esslingen',
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
