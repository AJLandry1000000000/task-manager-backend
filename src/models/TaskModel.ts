import { Model} from './Model';

export type TaskType = {
    id: number;
    name: string;
    description: string;
    due_date: Date;
    created_at: Date; 
    updated_at: Date; 
};

export class TaskModel extends Model {
    static tableName = 'tasks';
  
    public static async create<Payload>(data: Payload): Promise<TaskType> {
      return super.insert<Payload, TaskType>(data);
    }
  
    public static findByEmail(email: string): Promise<TaskType> {
      return this.findBy<{ email: string; }, TaskType>({ email });
    }
  }