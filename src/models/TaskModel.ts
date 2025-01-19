import { DateType, Model} from 'src/models/Model';

export type TaskType = {
    id: number;
    name: string;
    description: string;
    due_date: Date;
    // created_at: Date; // TODO
    // updated_at: Date; // TODO
};

export class TaskModel extends Model {
    static tableName = 'users';
  
    public static async create<Payload>(data: Payload): Promise<TaskType & DateType> {
      return super.insert<Payload, TaskType>(data);
    }
  
    public static findByEmail(email: string): Promise<TaskType> {
      return this.findBy<{ email: string; }, TaskType>({ email });
    }
  }