import {Model, Table, Column, ForeignKey, DataType} from 'sequelize-typescript';
import User from './Users';
import Roles from './Roles';

@Table({
    tableName: 'user_roles',
    timestamps: false,      
})

export class user_roles extends Model{
    
    @ForeignKey(()=>User)
    @Column({ type: DataType.INTEGER })
    user_id!:number
    
   @ForeignKey(()=>Roles) 
    @Column({ type: DataType.INTEGER })
    role_id!:number

}

export default user_roles;