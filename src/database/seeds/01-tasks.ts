import { Knex } from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tasks").del();

    const tasks = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      due_date: faker.date.anytime()
    }));

    // Inserts seed entries
    await knex("tasks").insert(tasks);
};
