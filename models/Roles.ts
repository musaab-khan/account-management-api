import {Model, Table, Column, BelongsToMany, DataType} from 'sequelize-typescript';
import Permissions from './Permissions'
import roles_permissions from './roles_permissions';

@Table({
    tableName: 'Roles',
    timestamps: true,
    underscored: true        
})

export class Roles extends Model{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id!:number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!:string;

    @BelongsToMany(()=> Permissions, ()=> roles_permissions)
    permissions!:Permissions;
}

export default Roles;