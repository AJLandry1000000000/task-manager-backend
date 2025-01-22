// import Knex from 'knex'; // TODO
import { IWithPagination } from 'knex-paginate';
import { database } from '../database/index';

export type DateType = {
    created_at: Date;
    updated_at: Date;
};


type ResponseType<Result> = Promise<Result>;

export class Model {
    static tableName: string;

    static PAGINATE_PER_PAGE = 3;
    
    private static get table() {
        if (!this.tableName) {
            throw new Error('Table name is not set! Set the table\'s name!');
        }

        return database(this.tableName);
    }

    public static async all<Result>(page: number): Promise<IWithPagination<Result[]>> {
        return this.table.paginate({ perPage: this.PAGINATE_PER_PAGE, currentPage: page })
    }

    public static async insert<Payload, Result>(data: Payload): ResponseType<Result> {
        const [result] = await this.table.insert(data).returning('*');
        return result;
    }

    public static async update<Payload, Result>(id: number, data: Payload): ResponseType<Result> {
        const [result] = await this.table.where({ id }).update(data).returning('*');
        return result;
    }

    public static async delete(id: number): Promise<number> {
        return this.table.where({ id }).del();
    }

    public static async findById<Result>(id: number): ResponseType<Result> {
        return this.table.where({ id }).first();
    }

    // public static async findBy<Payload, Result>(data: Payload): ResponseType<Result | null> { // TODO
    public static async findBy<Payload, Result>(data: Payload): ResponseType<Result> {
        return this.table.where(data as string).first();
    }

    public static async findByName<Result>(name: string, page: number): ResponseType<IWithPagination<Result[]>> {
        return this.table.where('name', 'ilike', `%${name}%`).paginate({ perPage: this.PAGINATE_PER_PAGE, currentPage: page })
    }

    public static async findByColumnOrdered<Result>(column: string, order :string, page: number, ): Promise<IWithPagination<Result[]>> {
        return this.table.orderBy(column, order).paginate({ perPage: this.PAGINATE_PER_PAGE, currentPage: page })
    }

}