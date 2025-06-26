import {Model, Table, Column, DataType, BelongsTo} from 'sequelize-typescript';
import User from './Users';
@Table({
    tableName: 'Address',
    timestamps: true,
    underscored: true,
})
export class Address extends Model{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    location!: string;

    @BelongsTo(() => User, {
        foreignKey: 'userId'
    })
    user!: User;
}

export default Address;