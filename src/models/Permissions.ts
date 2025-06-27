import {Model, Table, Column, DataType, BelongsToMany} from 'sequelize-typescript';
import Roles from './Roles';
import roles_permissions from './roles_permissions';

@Table({
    tableName: 'Permissions',
    timestamps: true,
    underscored: true        
})

export class Permissions extends Model{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id!:number
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!:string

    @BelongsToMany(()=>Roles, ()=>roles_permissions)
    roles!:Roles
}

export default Permissions;