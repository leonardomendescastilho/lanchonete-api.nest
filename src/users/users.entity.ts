import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class Users {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column()
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };

  @Column()
  purchaseHistory: {
    orderId: ObjectId;
    purchaseDate: Date;
    totalAmount: number;
  }[];
}
