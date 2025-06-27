import {Model, Table, Column, ForeignKey, DataType} from 'sequelize-typescript';
import Permissions from './Permissions'
import Roles from './Roles';

@Table({
    tableName: 'roles_permissions',
    timestamps: false,      
})

export class roles_permissions extends Model{
    
    @ForeignKey(()=>Roles)
    @Column({ type: DataType.INTEGER })
    role_id!:number
    
   @ForeignKey(()=>Permissions) 
    @Column({ type: DataType.INTEGER })
    permission_id!:number

}

export default roles_permissions;