import { knex } from 'knex';
import { attachPaginate } from 'knex-paginate';
import configs from '../../knexfile';

attachPaginate()

export const database = knex(configs[process.env.NODE_ENV || 'development']);