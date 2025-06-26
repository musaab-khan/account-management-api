import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import {Address} from './Address';

@Table({
  tableName: 'User',
  timestamps: true,
  underscored: true,
})

export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  profilePhoto?: string;

  // @HasMany(()=>Address, {
  //   foreignKey: 'userId',
  // })
  // addresses!: Address;
}

export default User;