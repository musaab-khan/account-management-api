import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import {Address} from './Address';
import Roles from './Roles';
import roles_permissions from './roles_permissions';
import user_roles from './user_roles';

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

  @BelongsToMany(()=> Roles, ()=> user_roles)
  roles!:Roles;
}

export default User;