import Knex from 'knex';

import configs from '../../knexfile';

export const databse = Knex(configs[process.env.NODE_ENV || 'development']);