import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Event } from "./event.model";
import { Person } from "./person.model";

@Table({ tableName: 'event_organizers' })
export class EventOrganizer extends Model {
	@ForeignKey(() => Event)
	@Column({ type: DataType.UUID })
	eventId!: string;

	@ForeignKey(() => Person)
	@Column({ type: DataType.UUID })
	personId!: string;
}