import {
	AllowNull,
	BelongsToMany,
	Column,
	CreatedAt,
	DataType,
	DeletedAt, Model,
	PrimaryKey,
	Sequelize,
	Table,
	UpdatedAt
} from 'sequelize-typescript';
import { Event } from './event.model';
import { EventOrganizer } from './eventOrganizer.model';

@Table({ tableName: 'people' })
export class Person extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: Sequelize.fn('uuid_generate_v4'),
	})
	id!: string;
	@AllowNull(false)
	@Column
	name!: string;

	@AllowNull(false)
	@CreatedAt
	@Column
	createdAt!: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column
	updatedAt!: Date;

	@AllowNull(true)
	@DeletedAt
	@Column
	deletedAt?: Date;

	@BelongsToMany(() => Event, () => EventOrganizer)
	events?: Event[];

}
