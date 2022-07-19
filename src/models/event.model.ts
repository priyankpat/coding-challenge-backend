import { AllowNull, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, Index, Model, PrimaryKey, Sequelize, Table, UpdatedAt } from 'sequelize-typescript';
import { EventOrganizer } from './eventOrganizer.model';
import { Person } from './person.model';

@Table({ tableName: 'events' })
export class Event extends Model {
	
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
	@Column
	isOutside!: boolean;

	@AllowNull(false)
	@Index('event_location')
	@Column
	location!: string;

	@Index('event_city')
	@Column
	city?: string;

	@Index('event_country')
	@Column
	country?: string;

	@Index('event_remote')
	@Column
	remote?: boolean;

	@AllowNull(false)
	@Index('event_date')
	@Column
	date!: Date;

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

	/*@BelongsTo(() => Person, {
		foreignKey: 'organizerId',
		keyType: DataType.UUID,
		onDelete: 'CASCADE'
	})
	organizer?: Person;*/

	@BelongsToMany(() => Person, () => EventOrganizer)
	organizers?: Person[];

}