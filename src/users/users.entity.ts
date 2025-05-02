import { ObjectId } from 'mongodb';
import { Column, ObjectIdColumn } from 'typeorm';

export class Users {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}
