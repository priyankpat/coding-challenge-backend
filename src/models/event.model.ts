import { AllowNull, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, Index, Model, PrimaryKey, Sequelize, Table, UpdatedAt } from 'sequelize-typescript';
import { EventOrganizer } from './eventOrganizer.model';
import { Person } from './person.model';

@Table({ tableName: 'events' })
export class Event extends Model {
	
	@PrimaryKey
	@Index('event_id')
	@Column({
		type: DataType.UUID,
		defaultValue: Sequelize.fn('uuid_generate_v4'),
	})
	id!: string;
	
	@AllowNull(false)
	@Column({
		type: DataType.STRING
	})
	name!: string;

	@AllowNull(false)
	@Column({
		type: DataType.BOOLEAN
	})
	isOutside!: boolean;

	@AllowNull(false)
	@Index('event_location')
	@Column({
		type: DataType.STRING
	})
	location!: string;

	@Index('event_city')
	@Column({
		type: DataType.STRING
	})
	city?: string;

	@Index('event_country')
	@Column({
		type: DataType.STRING
	})
	country?: string;

	@Index('event_remote')
	@Column({
		type: DataType.BOOLEAN
	})
	remote?: boolean;

	@AllowNull(false)
	@Index('event_date')
	@Column({
		type: DataType.DATE
	})
	date!: Date;

	@AllowNull(false)
	@CreatedAt
	@Column({
		type: DataType.DATE
	})
  createdAt!: Date;

	@AllowNull(false)
  @UpdatedAt
	@Column({
		type: DataType.DATE
	})
  updatedAt!: Date;

	@AllowNull(true)
	@DeletedAt
	@Column({
		type: DataType.DATE
	})
  deletedAt?: Date;

	@BelongsToMany(() => Person, () => EventOrganizer)
	organizers?: Person[];

}